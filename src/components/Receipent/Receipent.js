import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { connect } from 'react-redux';

import { createOrder, setNumber, setEmail, trigger } from '../../actions';
import {
  selectNumber,
  selectEmail,
  selectAmount,
  selectOperator,
  selectCountry,
} from '../../store';

import {
  historyProp,
  configProp,
  operatorResultProp,
  fnProp,
  emailProp,
  numberProp,
  amountProp,
  countryProp,
} from '../../lib/prop-types';
import { isValidEmail } from '../../lib/email-validation';

import { isValidForCountry } from '../../lib/number-helpers';

import Button from 'material-ui/Button';
import Input from 'material-ui/Input';

import Field from '../UI/Field';
import ErrorIcon from './error.svg';

const styles = {
  field: css`
    flex: 1 0 250px;
    margin: 0;
    margin-bottom: 24;
  `,
  input: css`
    max-width: 250;
    padding: 0 !important;
    background-color: #fff;
    margin: 4px -8px;
    & > input: {
      padding: 8;
    },
  `,
  button: css`
    width: 250px;
    height: 38px;
    margin-bottom: 0;
  `,
  icon: css`
    margin-right: 16px;
  `,
};

const Container = styled('div')`
  background-color: #fafafa;
  padding: 0 16px 16px;
`;

const Content = styled('div')`
  padding: 16px;
`;

const Error = styled('div')`
  background-color: #e1283c;
  margin: 0 -16px 16px;
  padding: 16px;
  color: #fff;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 10;
`;

class Receipent extends PureComponent {
  static propTypes = {
    config: configProp,
    amount: amountProp,
    createOrder: fnProp,
    operator: operatorResultProp,
    history: historyProp,
    trigger: fnProp,
    setNumber: fnProp,
    setEmail: fnProp,
    classes: PropTypes.object,
    number: numberProp,
    email: emailProp,
    paymentMethod: PropTypes.object,
    country: countryProp,
  };

  state = {
    error: null,
    isLoading: false,
  };

  // if we should show number input at all
  get showNumber() {
    const { operator } = this.props;
    return !operator.result || !operator.result.noNumber;
  }

  // if we need account number instead of phone number
  get isAccount() {
    const { operator } = this.props;
    return operator.result && !!operator.result.type;
  }

  getNumberLabel = () => {
    const { operator } = this.props;

    if (operator.result && operator.result.slug === 'reddit-gold') {
      return 'Reddit username or post link';
    }

    return this.isAccount
      ? 'The account number to top up'
      : 'The phone number to top up';
  };

  isComplete = () => {
    const { amount, number, operator, config, email } = this.props;
    return (
      amount &&
      (number || (operator.result && operator.result.noNumber)) &&
      (isValidEmail(config.orderOptions.email) || email.valid)
    );
  };

  continue = () => {
    const { history, amount, number, country } = this.props;

    let error;

    // no package or custom amount selected
    // amount might be string (like reddit gold)
    if (amount === 'NaN' || (typeof amount !== 'string' && isNaN(amount))) {
      error = 'Amount not selected';
    } else if (
      this.showNumber &&
      !this.isAccount &&
      !isValidForCountry(number, country)
    ) {
      error = 'Phone number does not match country';
    }

    this.setState({
      isLoading: !error,
      error,
    });

    if (error) {
      return;
    }

    history.push('/refill/selectPayment');
  };

  render() {
    const { config, setNumber, setEmail, number, email } = this.props;
    const { error, isLoading } = this.state;

    const showEmail = !isValidEmail(config.orderOptions.email);
    const numberLabel = this.getNumberLabel();

    return (
      <Container>
        {error && (
          <Error>
            <ErrorIcon fill="#fff" className={styles.icon} />
            <div>{error.message || error}</div>
          </Error>
        )}
        <Content>
          {this.showNumber && (
            <Field
              label={numberLabel}
              hint={numberLabel}
              className={styles.field}>
              <Input
                onChange={e => setNumber(e.target.value)}
                type={this.isAccount ? 'text' : 'tel'}
                value={number}
                fullWidth
                className={styles.input}
              />
            </Field>
          )}
          {showEmail && (
            <Field
              label="E-mail address"
              hint="The email address will receive order status updates"
              className={styles.field}>
              <Input
                onChange={e =>
                  setEmail({
                    value: e.target.value,
                    inFocus: true,
                  })
                }
                onBlur={e =>
                  setEmail({
                    value: e.target.value,
                    inFocus: false,
                  })
                }
                value={email.value}
                className={styles.input}
              />
            </Field>
          )}
        </Content>
        <Button
          color="primary"
          raised
          disabled={!this.isComplete() || isLoading}
          onClick={this.continue}
          className={styles.button}>
          Continue
        </Button>
      </Container>
    );
  }
}

export default connect(
  state => ({
    number: selectNumber(state),
    email: selectEmail(state),
    amount: selectAmount(state),
    operator: selectOperator(state),
    country: selectCountry(state),
  }),
  {
    createOrder,
    setNumber,
    setEmail,
    trigger,
  }
)(Receipent);

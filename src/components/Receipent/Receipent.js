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
import ErrorBanner from '../UI/ErrorBanner';

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
    margin-bottom: 24px;
    & > input: {
      padding: 8px;
    },
  `,
  button: css`
    width: 250px;
    height: 38px;
    margin-bottom: 0;
  `,
};

const Container = styled('div')`
  background-color: #fafafa;
  padding: 0 16px 16px;
`;

const Content = styled('div')`
  padding-top: 16px;
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

  validate = () => {
    const { amount, number, country } = this.props;

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
      error,
    });

    return !error;
  };

  continue = () => {
    const { history } = this.props;

    if (this.validate()) {
      history.push('/refill/selectPayment');
    }
  };

  render() {
    const { config, setEmail, number, email, setNumber } = this.props;
    const { error } = this.state;

    const showEmail = !isValidEmail(config.orderOptions.email);
    const numberLabel = this.getNumberLabel();

    return (
      <Container>
        {error && <ErrorBanner>{error.message || error}</ErrorBanner>}
        <Content>
          {this.showNumber && (
            <Field label={numberLabel} className={styles.field}>
              <Input
                onChange={e => setNumber(e.target.value)}
                type={this.isAccount ? 'text' : 'tel'}
                value={number}
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
          disabled={!this.isComplete()}
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

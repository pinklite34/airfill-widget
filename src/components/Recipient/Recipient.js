import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { connect } from 'react-redux';

import {
  setNumber,
  setEmail,
  trigger,
  setSubscribeNewsletter,
} from '../../actions';
import {
  selectNumber,
  selectEmail,
  selectAmount,
  selectOperator,
  selectCountry,
  selectSubscribeNewsletter,
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
import { Checkbox } from 'material-ui';

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

class Recipient extends PureComponent {
  static propTypes = {
    config: configProp,
    amount: amountProp,
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
    setSubscribeNewsletter: fnProp,
    subscribing: PropTypes.bool.isRequired,
  };

  state = {
    error: null,
  };

  getNumberLabel = () => {
    const { operator } = this.props;

    if (operator.result) {
      switch (operator.result.recipientType) {
        case 'phone_number':
          return 'The phone number to top up';
        case 'username':
          return 'Reddit username / post permalink';
        case 'email':
          return 'Delivery email address';
        case 'none':
        default:
          return '';
      }
    }
  };

  isComplete = () => {
    const { amount, number, operator, config, email } = this.props;
    return (
      (amount &&
        (number ||
          (operator.result && operator.result.recipientType !== 'none'))) ||
      (isValidEmail(config.orderOptions.email) || email.valid)
    );
  };

  validate = () => {
    const { config, number, country, operator, email } = this.props;

    let error;

    if (
      operator.result.recipientType === 'phone_number' &&
      !isValidForCountry(number, country)
    ) {
      error = 'Phone number does not match country';
    } else if (
      operator.result.recipientType === 'email' &&
      !isValidEmail(number)
    ) {
      error = 'Please enter a valid recipient email address';
    } else if (!isValidEmail(config.orderOptions.email) || email.valid) {
      error = 'Please enter a valid status update email address';
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
    const {
      config,
      setEmail,
      number,
      operator,
      email,
      setNumber,
      setSubscribeNewsletter,
      subscribing,
    } = this.props;
    const { error } = this.state;

    const showEmail = !isValidEmail(config.orderOptions.email);
    const numberLabel = this.getNumberLabel();

    return (
      <Container>
        {error && <ErrorBanner>{error.message || error}</ErrorBanner>}
        <Content>
          {numberLabel !== '' && (
            <Field label={numberLabel} className={styles.field}>
              <Input
                onChange={e => setNumber(e.target.value)}
                type={
                  operator.result.recipientType === 'phone_number'
                    ? 'tel'
                    : 'text'
                }
                value={number}
                className={styles.input}
              />
            </Field>
          )}
          {showEmail && (
            <Fragment>
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
              <Field>
                <Checkbox
                  onChange={e => setSubscribeNewsletter(e.target.checked)}
                  checked={subscribing}
                />
                Add me to the newsletter to receive news about new products and
                features
              </Field>
            </Fragment>
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
    subscribing: selectSubscribeNewsletter(state),
  }),
  {
    setNumber,
    setEmail,
    trigger,
    setSubscribeNewsletter,
  }
)(Recipient);

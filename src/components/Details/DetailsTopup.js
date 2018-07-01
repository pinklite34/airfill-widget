import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { connect } from 'react-redux';

import { createOrder, setNumber, setEmail, trigger } from '../../actions';
import {
  selectNumber,
  selectEmail,
  selectAmount,
  selectOperator,
  selectPaymentMethod,
  selectCountry,
} from '../../store';

import { canAfford } from '../../lib/currency-helpers';
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
import { CircularProgress } from 'material-ui/Progress';
import withStyles from 'material-ui/styles/withStyles';

import Field from '../UI/Field';
import Error from './error.svg';

const styles = {
  title: css`
    margin: 0;
  `,
  container: css`
    background-color: #fafafa;
    padding: 0 16px 16px;
  `,
  field: css`
    flex: 1 0 250px;
    margin: 0px;
    margin-bottom: 24px;
  `,
  input: css`
    max-width: 250px;
    padding: 0 !important;
    background-color: #fff;
    margin: 4px -8px;
    
    & > input {
      padding: 8px;
    },
  `,
  button: css`
    color: #fff !important;
    width: 250px;
    height: 38px;
    margin-bottom: 0px;
  `,
  error: css`
    background-color: #E1283C;
    margin: 0 -16px 16px;
    padding: 16px;
    color: #fff;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 1px 2px 0 rgba(0;0:px;0:px;.16):px;
    position: relative;
    z-index: 10;
  `,
  icon: css`
    margin-right: 16px;
  `,
  progressBar: css`
    fill: #fff;
  `,
};

const muiStyles = {
  primaryColor: {
    color: '#fff',
  },
};

class DetailsTopup extends PureComponent {
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
    paymentMethod: PropTypes.string,
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
      ((config.orderOptions &&
        config.orderOptions.email &&
        isValidEmail(config.orderOptions.email)) ||
        email.valid)
    );
  };

  createOrder = () => {
    const { amount, config, operator, paymentMethod } = this.props;

    // pick all affordable payment methods
    const methods = config.paymentButtons.filter(btn =>
      canAfford({
        amount: amount,
        accountBalance: config.accountBalance,
        packages: operator.result.packages,
        paymentMode: btn.paymentMode,
        requireAccountBalance: btn.requireAccountBalance,
        operator: operator.result,
      })
    );

    // pick last used or first
    const method =
      methods.find(btn => btn.paymentMode === paymentMethod) || methods[0];

    this.sendOrder(method);
  };

  sendOrder = method => {
    const {
      config,
      createOrder,
      history,
      amount,
      number,
      country,
      trigger,
    } = this.props;

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

    createOrder({
      ...config.orderOptions,
      paymentMethod: method.paymentMode,
    })
      .then(() => {
        history.push('/refill/payment');
        trigger();
      })
      .catch(error => this.setState({ isLoading: false, error }));
  };

  render() {
    const { config, setNumber, setEmail, classes, number, email } = this.props;
    const { error, isLoading } = this.state;

    const showEmail =
      !config.orderOptions ||
      !config.orderOptions.email ||
      !isValidEmail(config.orderOptions.email);
    const numberLabel = this.getNumberLabel();

    return (
      <div className={styles.container}>
        {error && (
          <div className={styles.error}>
            <Error fill="#fff" className={styles.icon} />
            <div>{error.message || error}</div>
          </div>
        )}
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
              className={`${styles.input}`}
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
              className={`${styles.input}`}
            />
          </Field>
        )}
        <Button
          color="primary"
          raised
          disabled={!this.isComplete() || isLoading}
          onClick={this.createOrder}
          className={`${styles.button}`}>
          {isLoading ? (
            <CircularProgress
              classes={classes}
              size={24}
              className={`${styles.progressBar}`}
            />
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    number: selectNumber(state),
    email: selectEmail(state),
    amount: selectAmount(state),
    operator: selectOperator(state),
    paymentMethod: selectPaymentMethod(state),
    country: selectCountry(state),
  }),
  {
    createOrder,
    setNumber,
    setEmail,
    trigger,
  }
)(withStyles(muiStyles)(DetailsTopup));

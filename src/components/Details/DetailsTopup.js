import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { createOrder, setNumber, setEmail, trigger } from '../../actions';
import {
  selectNumber,
  selectEmail,
  selectAmount,
  selectOperator,
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
} from '../../lib/prop-types';
import { isValidEmail } from '../../lib/email-validation';

import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import { CircularProgress } from 'material-ui/Progress';
import withStyles from 'material-ui/styles/withStyles';

import Field from '../UI/Field';
import Error from './error.svg';

const styles = {
  title: css({
    margin: 0,
  }),
  container: css({
    backgroundColor: '#FAFAFA',
    padding: '0 16px 16px',
  }),
  field: css({
    flex: '1 0 250px',
    margin: 0,
    marginBottom: 24,
  }),
  input: css({
    maxWidth: 250,
    padding: '0 !important',
    backgroundColor: '#fff',
    margin: '4px -8px',
    '& > input': {
      padding: 8,
    },
  }),
  button: css({
    color: '#fff !important',
    width: 250,
    height: 38,
    marginBottom: 0,
  }),
  error: css({
    backgroundColor: '#E1283C',
    margin: '0 -16px 16px',
    padding: 16,
    color: '#fff',
    fontWeight: 700,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.16)',
    position: 'relative',
    zIndex: 10,
  }),
  icon: css({
    marginRight: 16,
  }),
  progressBar: css({
    fill: '#fff',
  }),
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
  };

  state = {
    error: null,
    isLoading: false,
  };

  createOrder = () => {
    const {
      config,
      amount,
      createOrder,
      operator,
      history,
      trigger,
    } = this.props;

    const method = config.paymentButtons.find(btn =>
      canAfford({
        amount: amount,
        accountBalance: config.accountBalance,
        packages: operator.result.packages,
        paymentMode: btn.paymentMode,
        requireAccountBalance: btn.requireAccountBalance,
        operator: this.props.operator.result,
      })
    );

    this.setState({
      isLoading: true,
    });
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

  isComplete = () => {
    const { amount, number, operator, config, email } = this.props;
    return (
      amount &&
      (number || (operator.result && operator.result.noNumber)) &&
      (isValidEmail(config.orderOptions.email) || email.valid)
    );
  };

  render() {
    const {
      config,
      setNumber,
      setEmail,
      classes,
      number,
      email,
      operator,
    } = this.props;
    const { error, isLoading } = this.state;

    const showEmail = !isValidEmail(config.orderOptions.email);
    const showNumber = !operator.result || !operator.result.noNumber;
    const isAccount = !!operator.type;
    const numberLabel = isAccount ? 'account number' : 'phone number';

    return (
      <div {...styles.container}>
        {error && (
          <div {...styles.error}>
            <Error fill="#fff" {...styles.icon} />
            <div>{error.message}</div>
          </div>
        )}
        {showNumber && (
          <Field
            label={numberLabel}
            hint={`The ${numberLabel} to top up`}
            {...styles.field}
          >
            <Input
              onChange={e => setNumber(e.target.value)}
              type={isAccount ? 'text' : 'tel'}
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
            {...styles.field}
          >
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
          className={`${styles.button}`}
        >
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
  }),
  {
    createOrder,
    setNumber,
    setEmail,
    trigger,
  }
)(withStyles(muiStyles)(DetailsTopup));
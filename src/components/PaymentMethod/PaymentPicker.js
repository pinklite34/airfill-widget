import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  historyProp,
  configProp,
  amountProp,
  operatorProp,
} from '../../lib/prop-types';
import { CircularProgress } from 'material-ui/Progress';

import PaymentItem from './PaymentItem';
import Button from 'material-ui/Button';
import {
  selectPaymentMethod,
  selectNumber,
  selectEmail,
  selectAmount,
  selectOperator,
  selectCountry,
} from '../../store';
import {
  setPaymentMethod,
  createOrder,
  setNumber,
  setEmail,
  trigger,
} from '../../actions';

import { canAfford } from '../../lib/currency-helpers';

const Container = styled('div')``;

const MethodContainer = styled('div')`
  @media (min-width: 460px) {
    max-height: ${72 * 4}px;
    overflow-y: scroll;
  }

  width: 100%;
`;

const styles = {
  button: css`
    width: 250px;
    margin: 24px;
  `,
};

class PaymentMethod extends React.Component {
  constructor(props) {
    super(props);

    this.select(null);

    this.state = {
      isLoading: false,
    };
  }

  canAfford = btn =>
    canAfford({
      mode: btn.paymentMode,
      accountBalance: this.props.config.accountBalance,
      amount: this.props.amount,
      billingCurrency: this.props.config.billingCurrency,
      operator: this.props.operator.result,
      requireAccountBalance: btn.requireAccountBalance,
    });

  select = method => this.props.setPaymentMethod(method);

  createOrder = () => {
    const {
      config,
      createOrder,
      history,
      trigger,
      selectedMethod,
    } = this.props;

    this.setState({
      isLoading: true,
    });

    createOrder({
      ...config.orderOptions,
      paymentMethod: selectedMethod.paymentMode,
    })
      .then(() => {
        history.push('/refill/payment');
        trigger();
      })
      .catch(error => this.setState({ isLoading: false, error }));
  };

  render() {
    const { config, selectedMethod } = this.props;
    const { isLoading } = this.state;

    return (
      <Container>
        <MethodContainer>
          {config.paymentButtons.map(method => {
            const affordable = this.canAfford(method);

            return (
              <PaymentItem
                key={method.title}
                {...method}
                onClick={() => affordable && this.select(method)}
                selected={method === selectedMethod}
                disabled={!affordable}
              />
            );
          })}
        </MethodContainer>

        <Button
          color="primary"
          raised
          disabled={isLoading || !selectedMethod}
          className={styles.button}
          onClick={this.createOrder}>
          {isLoading ? (
            <CircularProgress
              // classes={classes}
              size={24}
              // className={`${styles.progressBar}`}
            />
          ) : (
            'Continue'
          )}
        </Button>
      </Container>
    );
  }
}

PaymentMethod.propTypes = {
  history: historyProp,
  paymentButtons: PropTypes.array.isRequired,
  selectedMethod: PropTypes.object,
  setPaymentMethod: PropTypes.func.isRequired,
  config: configProp,
  createOrder: PropTypes.func.isRequired,
  trigger: PropTypes.func.isRequired,
  amount: amountProp,
  operator: operatorProp,
};

export default compose(
  withRouter,
  connect(
    state => ({
      selectedMethod: selectPaymentMethod(state),
      number: selectNumber(state),
      email: selectEmail(state),
      amount: selectAmount(state),
      operator: selectOperator(state),
      country: selectCountry(state),
    }),
    {
      setPaymentMethod,
      createOrder,
      setNumber,
      setEmail,
      trigger,
    }
  )
)(PaymentMethod);

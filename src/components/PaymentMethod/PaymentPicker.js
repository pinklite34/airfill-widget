import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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
import {
  historyProp,
  configProp,
  amountProp,
  operatorProp,
  paymentProp,
} from '../../lib/prop-types';

import { canAfford } from '../../lib/currency-helpers';

import PaymentItem from './PaymentItem';
import NextButton from '../UI/NextButton';
import ActiveSection from '../UI/ActiveSection';

const MethodContainer = styled('div')`
  background-color: #fff;
  width: 100%;
`;

class PaymentMethod extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
    };

    const { config } = this.props;

    if (config.coin) {
      this.select(
        config.paymentButtons.find(x => x.paymentMode === config.coin)
      );
    } else {
      this.select(null);
    }
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
    const { config, createOrder, history, trigger } = this.props;

    this.setState({
      isLoading: true,
    });

    createOrder(config.orderOptions)
      .then(() => {
        history.push('/refill/payment');
        trigger();
      })
      .catch(error => this.setState({ isLoading: false, error }));
  };

  render() {
    const { config, selectedMethod } = this.props;
    const { isLoading, error } = this.state;

    return (
      <ActiveSection
        renderNextButton={() => (
          <NextButton
            disabled={isLoading || !selectedMethod}
            onClick={this.createOrder}
            loading={isLoading}
          />
        )}
        error={error}>
        <MethodContainer>
          {config.paymentButtons
            .reduce(
              (prev, curr) =>
                curr.paymentMode === config.coin
                  ? [curr, ...prev]
                  : [...prev, curr],
              []
            )
            .map(method => {
              const affordable = this.canAfford(method);

              return (
                <PaymentItem
                  key={method.title.id || method.title}
                  method={method}
                  onClick={() => affordable && this.select(method)}
                  selected={method === selectedMethod}
                  disabled={!affordable}
                />
              );
            })}
        </MethodContainer>
      </ActiveSection>
    );
  }
}

PaymentMethod.propTypes = {
  history: historyProp,
  selectedMethod: paymentProp,
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

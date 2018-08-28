import { History } from 'history';
import * as React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  Amount,
  Config,
  OperatorResult,
  OrderOptions,
  PaymentButton,
} from '../../types';

import {
  createOrder,
  setEmail,
  setNumber,
  setPaymentMethod,
  trigger,
} from '../../actions';
import { canAfford } from '../../payment-methods';
import {
  selectAmount,
  selectCountry,
  selectEmail,
  selectNumber,
  selectOperator,
  selectPaymentMethod,
} from '../../store';

import ActiveSection from '../UI/ActiveSection';
import NextButton from '../UI/NextButton';
import PaymentItem from './PaymentItem';

const MethodContainer = styled('div')`
  background-color: #fff;
  width: 100%;
`;

interface PaymentMethodProps {
  history: History;
  selectedMethod: PaymentButton;
  setPaymentMethod: typeof setPaymentMethod;
  config: Config;
  createOrder: (options: OrderOptions) => Promise<any>;
  trigger: () => void;
  amount: Amount;
  operator: OperatorResult;
}

class PaymentMethod extends React.Component<PaymentMethodProps> {
  state = {
    isLoading: false,
    error: null,
  };

  constructor(props) {
    super(props);

    const { config } = this.props;

    if (config.coin) {
      this.select(
        config.paymentButtons.find(x => x.paymentMode === config.coin)
      );
    } else {
      this.select(null);
    }
  }

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
    const { config, selectedMethod, operator, amount } = this.props;
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
        error={error}
      >
        <MethodContainer>
          {config.paymentButtons
            .reduce(
              (prev, curr) =>
                curr.paymentMode === config.coin
                  ? [curr, ...(prev as any)]
                  : [...(prev as any), curr],
              []
            )
            .map(method => {
              const affordable =
                typeof method.canAfford === 'function'
                  ? canAfford(
                      method,
                      operator,
                      amount,
                      config.billingCurrency,
                      config.userAccountBalance
                    )
                  : true;

              return (
                <PaymentItem
                  key={method.title.id || method.title}
                  method={method}
                  onClick={() => this.select(method)}
                  affordable={affordable}
                  selected={method === selectedMethod}
                />
              );
            })}
        </MethodContainer>
      </ActiveSection>
    );
  }
}

export default connect(
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
)(withRouter(PaymentMethod));

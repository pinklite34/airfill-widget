import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
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

const ButtonContainer = styled('div')`
  padding: 24px;
`;

class PaymentMethod extends React.Component {
  constructor(props) {
    super(props);

    // pick first affordable payment method
    /* const methods = props.config.paymentButtons.filter(btn =>
      canAfford({
        amount: props.amount,
        btcPrice: Number(props.order.btcPrice),
        accountBalance: props.accountBalance,
        paymentMode: btn.paymentMode,
        requireAccountBalance: btn.requireAccountBalance,
      })
    );

    console.log('first affordable', methods[0]);

    this.select(methods[0]); */
    console.log(props);

    props.config.paymentButtons.forEach(btn => {
      const afford = canAfford({
        mode: btn.paymentMode,
        accountBalance: props.config.accountBalance,
        amount: props.amount,
        billingCurrency: props.config.billingCurrency,
        operator: props.operator.result,
      });
      console.log(btn.title, afford);
    });

    this.state = {
      isLoading: false,
    };
  }

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
          {config.paymentButtons.map(method => (
            <PaymentItem
              key={method.title}
              {...method}
              onClick={() => this.select(method)}
              selected={method === selectedMethod}
            />
          ))}
        </MethodContainer>

        <ButtonContainer>
          <Button
            color="primary"
            raised
            disabled={isLoading}
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
        </ButtonContainer>
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

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { historyProp, configProp } from '../../lib/prop-types';
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

const Container = styled('div')``;

const MethodContainer = styled('div')`
  @media (min-width: 460px) {
    max-height: ${72 * 4}px;
    overflow-y: scroll;
  }

  width: 100%;
`;

class PaymentMethod extends React.Component {
  state = {
    isLoading: false,
  };

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

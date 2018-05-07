import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { historyProp } from '../../lib/prop-types';

import PaymentItem from './PaymentItem';
import Button from 'material-ui/Button';
import { selectPaymentMethod } from '../../store';
import { setPaymentMethod } from '../../actions';

const Container = styled('div')`
  padding: 24px;
`;

const MethodContainer = styled('div')`
  max-height: ${72 * 4}px;
  width: 100%;
  overflow-y: scroll;
`;

class PaymentMethod extends React.Component {
  select = method => this.props.setPaymentMethod(method);

  render() {
    const { history, paymentButtons, selectedMethod } = this.props;

    return (
      <Container>
        <MethodContainer>
          {paymentButtons.map(method => (
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
          onClick={() => history.push('/refill/payment')}>
          Continue
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
};

export default compose(
  withRouter,
  connect(
    state => ({
      selectedMethod: selectPaymentMethod(state),
    }),
    {
      setPaymentMethod,
    }
  )
)(PaymentMethod);

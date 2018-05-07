import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withRouter } from 'react-router';
import { historyProp } from '../../lib/prop-types';

import PaymentItem from './PaymentItem';

const Container = styled('div')`
  padding: 24px;
`;

const MethodContainer = styled('div')`
  max-height: ${72 * 4}px;
  width: 100%;
  overflow-y: scroll;
`;

const PaymentMethod = ({ history, paymentButtons }) => (
  <Container>
    <button onClick={() => history.push('/refill/payment')}>final step</button>

    <MethodContainer>
      {paymentButtons.map(method => (
        <PaymentItem key={method.title} {...method} />
      ))}
    </MethodContainer>
  </Container>
);

PaymentMethod.propTypes = {
  history: historyProp,
  paymentButtons: PropTypes.array.isRequired,
};

export default withRouter(PaymentMethod);

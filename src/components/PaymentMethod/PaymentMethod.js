import React from 'react';
import { withRouter } from 'react-router';
import { historyProp } from '../../lib/prop-types';

const PaymentMethod = ({ history }) => (
  <button onClick={() => history.push('/refill/payment')}>final step</button>
);

PaymentMethod.propTypes = {
  history: historyProp,
};

export default withRouter(PaymentMethod);

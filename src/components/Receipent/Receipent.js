import React from 'react';
import { withRouter } from 'react-router';
import { historyProp } from '../../lib/prop-types';

const Receipent = ({ history }) => (
  <button onClick={() => history.push('/refill/selectPayment')}>
    select receipent
  </button>
);

Receipent.propTypes = {
  history: historyProp,
};

export default withRouter(Receipent);

import React from 'react';
import Button from '../UI/Button';

import { historyProp, orderProp } from '../../lib/prop-types';

export default function BalanceTooLow({ order, history }) {
  return (
    <div>
      <h3>Insufficient funds</h3>
      <p>
        Your balance on this account is too low to purchase the refill{' '}
        <strong>{order.itemDesc}</strong>.
      </p>
      <Button onClick={() => history.push('/refill/selectAmount')}>
        Pick another package
      </Button>
    </div>
  );
}

BalanceTooLow.propTypes = {
  history: historyProp,
  order: orderProp,
};

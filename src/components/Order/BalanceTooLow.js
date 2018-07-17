import React from 'react';
import Button from '../UI/Button';

import { historyProp, orderProp } from '../../lib/prop-types';
import Text from '../UI/Text';

export default function BalanceTooLow({ order, history }) {
  const description = order && order.itemDesc;
  return (
    <div>
      <Text type="h3" id="order.lowbalance.title">
        Insufficient funds
      </Text>
      <Text id="order.lowbalance.subtitle">
        Your balance on this account is too low to purchase the refill{' '}
        <strong>{{ description }}</strong>.
      </Text>
      <Button
        onClick={() => history.push('/refill/selectAmount')}
        text={{ id: 'button.pickpackage', children: 'Pick another package' }}
      />
    </div>
  );
}

BalanceTooLow.propTypes = {
  history: historyProp,
  order: orderProp,
};

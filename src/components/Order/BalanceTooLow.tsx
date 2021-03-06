import { History } from 'history';
import * as React from 'react';

import { Order } from '../../types';
import Button from '../UI/Button';
import Text from '../UI/Text';
import PaymentLayout from './PaymentLayout';

interface BalanceTooLow {
  order: Order;
  history: History;
}

export default function BalanceTooLow({ order, history }) {
  const description = order && order.itemDesc;
  return (
    <PaymentLayout>
      <Text type="h1" id="order.lowbalance.title">
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
    </PaymentLayout>
  );
}

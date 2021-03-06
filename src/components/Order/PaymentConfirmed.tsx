import * as React from 'react';

import { Order } from '../../types';
import OrderHeader from '../UI/OrderHeader';
import Spinner from '../UI/Spinner';
import Text from '../UI/Text';
import PaymentLayout from './PaymentLayout';

interface PaymentConfirmedProps {
  order: Order;
}

const refillTitle = {
  id: 'order.confirmed.title',
  children: 'Refill sent!',
};

const deliveryTitle = {
  id: 'order.confirmed.delivery',
  children: 'Delivery in progress',
};

export default function PaymentConfirmed(props: PaymentConfirmedProps) {
  return (
    <React.Fragment>
      <OrderHeader
        order={props.order}
        title={
          props.order.operatorType === 'refill' ? refillTitle : deliveryTitle
        }
        subtitle={{
          id: 'order.confirmed.subtitle',
          children: 'Waiting for delivery confirmation',
        }}
        icon={<Spinner tight />}
      />
      <PaymentLayout {...props} />
    </React.Fragment>
  );
}

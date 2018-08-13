import * as React from 'react';

import { Order } from '../../lib/prop-types';
import OrderHeader from '../UI/OrderHeader';
import Spinner from '../UI/Spinner';
import Text from '../UI/Text';
import PaymentLayout from './PaymentLayout';

interface PaymentConfirmedProps {
  order: Order;
}

export default function PaymentConfirmed(props: PaymentConfirmedProps) {
  return (
    <React.Fragment>
      <OrderHeader
        order={props.order}
        title={{ id: 'order.confirmed.title', children: 'Refill sent!' }}
        subtitle={{
          id: 'order.confirmed.subtitle',
          children: 'Waiting for delivery confirmation',
        }}
        icon={<Spinner tight />}
      />
      <PaymentLayout {...props}>
        <Text id="order.confirmed.info" type="p">
          The refill should arrive on the target account any minute now.
        </Text>
      </PaymentLayout>
    </React.Fragment>
  );
}

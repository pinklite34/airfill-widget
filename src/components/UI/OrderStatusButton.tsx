import * as React from 'react';

import { Order, TransProp } from '../../lib/prop-types';
import Button from './Button';
import Link from './Link';

interface OrderStatusButtonProps {
  order: Order;
  text: TransProp;
}

export default function OrderStatusButton(props: OrderStatusButtonProps) {
  const { order, text } = props;

  return (
    <Link
      href={`https://www.bitrefill.com/support/${
        order.orderId
      }/${order.payment && order.payment.address}`}
    >
      <Button
        style={{ textDecoration: 'none', margin: '10px 0' }}
        text={
          text || {
            id: 'order.failed.orderstatus',
            children: 'Order status',
          }
        }
      />
    </Link>
  );
}

import * as React from 'react';

import { orderProp, transProp } from '../../lib/prop-types';

import Link from './Link';

import Button from './Button';

export default function OrderStatusButton(props) {
  const { order, text } = props;

  return (
    <Link
      href={`https://www.bitrefill.com/support/${
        order.orderId
      }/${order.payment && order.payment.address}`}>
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
/*
OrderStatusButton.propTypes = {
  order: orderProp,
  text: transProp,
};
 */
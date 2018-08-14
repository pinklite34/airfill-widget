import * as React from 'react';

import { Order, PaymentStatus } from '../../lib/prop-types';
import OrderHeader from '../UI/OrderHeader';
import OrderStatusButton from '../UI/OrderStatusButton';
import Error from './error.svg';
import PaymentLayout from './PaymentLayout';

interface PaymentErrorProps {
  order: Order;
  paymentStatus: PaymentStatus;
  text?: any;
}

function PaymentError(props: PaymentErrorProps) {
  const { order, paymentStatus, text } = props;

  const error =
    (paymentStatus && paymentStatus.message) || (order && order.errorMessage);

  return (
    <React.Fragment>
      <OrderHeader
        order={order}
        title={{ id: 'order.error.title', children: 'Payment error' }}
        subtitle={error ? { children: error } : null}
        icon={<Error />}
      />

      <PaymentLayout {...props}>
        <OrderStatusButton order={order} text={text} />
      </PaymentLayout>
    </React.Fragment>
  );
}

export default PaymentError;

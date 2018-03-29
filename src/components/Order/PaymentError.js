import React from 'react';

import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';
import Error from './error.svg';
import { orderProp, paymentStatusProp } from '../../lib/prop-types';

const PaymentError = props => {
  const { order, paymentStatus: { message = '' } } = props;

  return (
    <div>
      <OrderHeader
        order={order}
        title="Payment error"
        subtitle={message}
        icon={<Error />}
      />
      <PaymentLayout {...props} />
    </div>
  );
};

PaymentError.propTypes = {
  order: orderProp,
  paymentStatus: paymentStatusProp,
};

export default PaymentError;

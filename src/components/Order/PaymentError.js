import React, { Fragment } from 'react';

import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';
import Error from './error.svg';
import { orderProp, paymentStatusProp } from '../../lib/prop-types';

const PaymentError = props => {
  const {
    order,
    paymentStatus: { message = '' },
  } = props;

  return (
    <Fragment>
      <OrderHeader
        order={order}
        title={{ id: 'order.error.title', children: 'Payment error' }}
        subtitle={{ children: message }}
        icon={<Error />}
      />

      <PaymentLayout {...props} />
    </Fragment>
  );
};

PaymentError.propTypes = {
  order: orderProp,
  paymentStatus: paymentStatusProp,
};

export default PaymentError;

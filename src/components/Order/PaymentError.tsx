import * as React  from 'react';

import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';
import Error from './error.svg';
import { orderProp, paymentStatusProp } from '../../lib/prop-types';
import OrderStatusButton from '../UI/OrderStatusButton';

const PaymentError = props => {
  const { order, paymentStatus } = props;

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
        <OrderStatusButton {...props} />
      </PaymentLayout>
     </React.Fragment>
  );
};

/* PaymentError.propTypes = {
  order: orderProp,
  paymentStatus: paymentStatusProp,
}; */

export default PaymentError;

import PropTypes from 'prop-types';
import React from 'react';
import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';
import Error from './error.svg';

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
  order: PropTypes.object.isRequired,
};

export default PaymentError;

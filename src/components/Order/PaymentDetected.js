import PropTypes from 'prop-types';
import React from 'react';
import OrderStatus from '../UI/OrderStatus';
import OrderStep from '../UI/OrderStep';

const PaymentDetected = ({ order }) => {
  return (
    <div>
      <OrderStatus>
        <OrderStep done>Payment detected</OrderStep>
        <OrderStep>Waiting for payment confirmation</OrderStep>
      </OrderStatus>
      <p>
        We have detected your payment, and will process your order as soon as
        the transaction is confirmed on the Bitcoin network. This usually takes
        no longer than 10 minutes.
      </p>
      <p>
        <a
          href={`https://live.blockcypher.com/btc/address/${order.payment
            .address}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow transaction confirmation status
        </a>
      </p>
    </div>
  );
};

PaymentDetected.propTypes = {
  order: PropTypes.object.isRequired
};

export default PaymentDetected;

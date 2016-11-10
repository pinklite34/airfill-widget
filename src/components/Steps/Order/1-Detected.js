import React, {PropTypes} from 'react';

const PaymentDetected = ({order}) => {
  return (
    <div>
      <h3>Payment detected</h3>
      <p>
        We have detected your payment, and will process your order as soon as
        the transaction is confirmed on the Bitcoin network. This usually
        takes no longer than 10 minutes.
      </p>
      <p>
        <a href={`https://live.blockcypher.com/btc/address/${order.payment.address}/`}
        target="_blank">Click here to see how it's going</a>
      </p>
    </div>
  );
};

PaymentDetected.propTypes = {
  order: PropTypes.object.isRequired
};

export default PaymentDetected;

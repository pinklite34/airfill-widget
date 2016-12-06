import React from 'react';
import Spinner from  '../../UI/Spinner';

const PaymentConfirmed = () => {
  return (
    <div>
      <h3 className="order-step">
        <span className="order-step-symbol order-step-done">✓</span>
        Payment complete
      </h3>
      <h3 className="order-step">
        <span className="order-step-symbol order-step-done">✓</span>
        Refill sent
      </h3>
      <h3 className="order-step">
        <Spinner hideText={true} className="order-step-symbol" />
        Waiting for delivery confirmation
      </h3>
      <p>The refill should arrive on the target account any minute now...</p>
    </div>
  );
};

PaymentConfirmed.propTypes = {};

export default PaymentConfirmed;

import React from 'react';
import OrderStep from  '../../UI/OrderStep';

const PaymentConfirmed = () => {
  return (
    <div>
      <OrderStep done>Payment complete</OrderStep>
      <OrderStep done>Refill sent</OrderStep>
      <OrderStep>Waiting for delivery confirmation</OrderStep>
      <p>The refill should arrive on the target account any minute now...</p>
    </div>
  );
};

export default PaymentConfirmed;

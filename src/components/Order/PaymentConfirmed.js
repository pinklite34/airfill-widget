import React from 'react';
import OrderStatus from '../UI/OrderStatus';
import OrderStep from '../UI/OrderStep';

const PaymentConfirmed = () => {
  return (
    <div>
      <OrderStatus>
        <OrderStep done>Payment complete</OrderStep>
        <OrderStep done>Refill sent</OrderStep>
        <OrderStep>Waiting for delivery confirmation</OrderStep>
      </OrderStatus>
      <p>The refill should arrive on the target account any minute now...</p>
    </div>
  );
};

export default PaymentConfirmed;

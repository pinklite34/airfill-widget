import React from 'react';

const BalanceTooLow = ({order}) => {
  return (
    <div>
      <h3>Insufficient funds</h3>
      <p>
        Your balance on this account is too low to purchase this refill ({order.itemDesc})
      </p>
    </div>
  );
};

export default BalanceTooLow;
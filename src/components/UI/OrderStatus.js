import React from 'react';
import { css } from 'glamor';

const OrderStatus = ({ children }) => (
  <div
    {...css({
      padding: '0 24px'
    })}
  >
    {children}
  </div>
);

export default OrderStatus;

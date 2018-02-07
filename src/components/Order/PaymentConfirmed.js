import React from 'react';
import OrderStatus from '../UI/OrderStatus';
import OrderStep from '../UI/OrderStep';
import PaymentLayout from './PaymentLayout';
import OrderHeader from '../UI/OrderHeader';
import Confirmed from './confirmed.svg';
import { css } from 'glamor';

const styles = {
  textContainer: css({
    display: 'block !important',
    lineHeight: '21px',
    marginRight: '48px',
  }),
  info: css({
    color: '#777777',
    fontSize: '14px'
  })
};

const PaymentConfirmed = props => {
  return (
    <div>
      <OrderHeader
        order={props.order}
        title="Payment confirmed"
        subtitle="Your payment has been confirmed"
        icon={<Confirmed/>}
      />
      <PaymentLayout {...props}>
        <div>
          <div/>
          <div {...styles.textContainer}>
            <span {...styles.info}>
              The refill should arrive on the target account any minute now.
            </span>
          </div>
        </div>
      </PaymentLayout>

    </div>
  );
};

export default PaymentConfirmed;

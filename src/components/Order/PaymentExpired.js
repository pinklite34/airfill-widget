import React from 'react';
import Button from 'material-ui/Button';
import OrderHeader from '../UI/OrderHeader';
import Error from './error.svg';
import PaymentLayout from './PaymentLayout';
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

const ExpiredPayment = props => {
  return (
    <div>
      <OrderHeader
        order={props.order}
        title="Order expired"
        subtitle="This order has expired"
        icon={<Error/>}
      />
      <PaymentLayout {...props}>
        <div>
          <div/>
          <div {...styles.textContainer}>
            <span {...styles.info}>
              This order has expired. Please refresh the page to generate a new invoice
            </span>
          </div>
        </div>
      </PaymentLayout>
    </div>
  );
};

export default ExpiredPayment;

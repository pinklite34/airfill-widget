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
};

const ExpiredPayment = props => {
  return (
    <div>
      <OrderHeader
        order={props.order}
        title="Order expired"
        subtitle="This order has expired"
        icon={<Error />}
      />
      <PaymentLayout {...props}>
        <div>
          <div />
          <div {...styles.textContainer}>
            <Button color="primary" variant="raised" onClick={props.onReset}>
              New order
            </Button>
          </div>
        </div>
      </PaymentLayout>
    </div>
  );
};

export default ExpiredPayment;

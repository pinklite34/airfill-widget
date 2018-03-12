import React from 'react';
import { css } from 'glamor';
import Button from 'material-ui/Button';

import { orderProp, fnProp } from '../../lib/prop-types';
import OrderHeader from '../UI/OrderHeader';
import Error from './error.svg';
import PaymentLayout from './PaymentLayout';

const styles = {
  textContainer: css({
    display: 'block !important',
    lineHeight: '21px',
    marginRight: '48px',
  }),
};

export default function PaymentExpired(props) {
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
            <Button color="primary" raised onClick={props.onReset}>
              New order
            </Button>
          </div>
        </div>
      </PaymentLayout>
    </div>
  );
}

PaymentExpired.propTypes = {
  order: orderProp,
  onReset: fnProp,
};

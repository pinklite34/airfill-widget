import React from 'react';
import { css } from 'react-emotion';
import Button from '../UI/Button';

import { orderProp, fnProp } from '../../lib/prop-types';
import OrderHeader from '../UI/OrderHeader';
import Error from './error.svg';
import PaymentLayout from './PaymentLayout';

const styles = {
  textContainer: css`
    display: block !important;
    line-height: 21px;
    margin-right: 48px;
  `,
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
          <div className={styles.textContainer}>
            <Button onClick={props.onReset}>New order</Button>
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

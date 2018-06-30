import React from 'react';
import { css } from 'react-emotion';

import { orderProp } from '../../lib/prop-types';

import PaymentLayout from './PaymentLayout';
import OrderHeader from '../UI/OrderHeader';

import CircularProgress from 'material-ui/Progress/CircularProgress';

const styles = {
  textContainer: css`
    display: block !important;
    line-height: 21px;
    margin-right: 48px;
  `,
  info: css`
    color: #777777;
    font-size: 14px;
  `,
};

export default function PaymentConfirmed(props) {
  return (
    <div>
      <OrderHeader
        order={props.order}
        title="Refill sent!"
        subtitle="Waiting for delivery confirmation"
        icon={<CircularProgress size={32} />}
      />
      <PaymentLayout {...props}>
        <div>
          <div />
          <div className={styles.textContainer}>
            <span className={styles.info}>
              The refill should arrive on the target account any minute now.
            </span>
          </div>
        </div>
      </PaymentLayout>
    </div>
  );
}

PaymentConfirmed.propTypes = {
  order: orderProp,
};

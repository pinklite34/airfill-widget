import React, { Fragment } from 'react';
import { css } from 'glamor';

import Button from 'material-ui/Button';

import { paymentStatusProp, orderProp, fnProp } from '../../lib/prop-types';
import OrderHeader from '../UI/OrderHeader';
import Confirmed from './confirmed.svg';
import PaymentLayout from './PaymentLayout';

const styles = {
  textContainer: css({
    display: 'block !important',
    lineHeight: '21px',
    marginRight: '48px',
  }),
  info: css({
    color: '#777777',
    fontSize: '14px',
  }),
  link: css({
    color: '#3e8fe4',
    fontSize: '14px',
    textDecoration: 'underline',
  }),
  button: css({
    marginTop: '12px',
  }),
};

export default function RefillDelivered(props) {
  const { paymentStatus } = props;

  const pinInfo = paymentStatus.pinInfo;

  return (
    <div>
      <OrderHeader
        order={props.order}
        title="Refill delivered"
        subtitle="The refill delivery has been confirmed by the operator"
        icon={<Confirmed />}
      />

      <PaymentLayout {...props}>
        {pinInfo && (
          <Fragment>
            {pinInfo.pin && (
              <div>
                <div>PIN</div>
                <div>{pinInfo.pin}</div>
              </div>
            )}
            {(pinInfo.instructions || pinInfo.other) && (
              <div>
                <div />
                <div>
                  {pinInfo.instructions}
                  <br />
                  {pinInfo.other}
                </div>
              </div>
            )}
          </Fragment>
        )}
        <div>
          <div />
          <div {...styles.textContainer}>
            {!pinInfo && (
              <span {...styles.info}>
                The refill has been delivered and credited to the balance of the
                target device.
                <br />
              </span>
            )}
            <a
              {...styles.link}
              href="https://www.bitrefill.com/faq/#my-topup-did-not-arrive"
              target="_blank"
              rel="noopener noreferrer"
            >
              Can&apos;t see your refill?
            </a>
            <br />
            <Button
              color="primary"
              raised
              {...styles.button}
              onClick={props.onReset}
            >
              Buy another refill
            </Button>
          </div>
        </div>
      </PaymentLayout>
    </div>
  );
}

RefillDelivered.propTypes = {
  paymentStatus: paymentStatusProp,
  order: orderProp,
  onReset: fnProp,
};

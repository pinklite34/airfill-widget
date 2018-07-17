import React from 'react';
import { css } from 'react-emotion';

import { orderProp, fnProp } from '../../lib/prop-types';

import PaymentLayout from './PaymentLayout';
import OrderHeader from '../UI/OrderHeader';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner';

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
  link: css`
    color: #3e8fe4;
    font-size: 14px;
    text-decoration: underline;
  `,
  button: css`
    margin-top: 12px;
  `,
};

export default function PaymentDetected(props) {
  return (
    <div>
      <OrderHeader
        order={props.order}
        title={{ id: 'order.detected.title', children: 'Payment detected' }}
        subtitle={{
          id: 'order.detected.subtitle',
          children: "We're waiting for your payment to be confirmed",
        }}
        icon={<Spinner tight />}
      />
      <PaymentLayout {...props}>
        <div>
          <div />
          <div className={styles.textContainer}>
            <span className={styles.info}>
              <p>
                We will send your refill as soon as the transaction is
                completed. This can be slow if the network is very busy, but
                usually it only takes a few minutes!
              </p>
              This page will update with additional details when we have
              confirmed your payment.
            </span>
            <br />
            {props.order.paymentMethod === 'bitcoin' ? (
              <span
                className={styles.link}
                onClick={() =>
                  window.open(
                    `https://transactioncheck.bitrefill.com/lookup/${
                      props.order.payment.address
                    }`,
                    '_blank'
                  )
                }>
                Click here to see how it&#39;s going
              </span>
            ) : (
              <span className={styles.link}>When will I get my refill?</span>
            )}
            <br />
            <Button
              className={styles.button}
              onClick={props.onReset}
              text={{
                id: 'button.refillagain',
                children: 'Buy another refill',
              }}
            />
          </div>
        </div>
      </PaymentLayout>
    </div>
  );
}

PaymentDetected.propTypes = {
  order: orderProp,
  onReset: fnProp,
};

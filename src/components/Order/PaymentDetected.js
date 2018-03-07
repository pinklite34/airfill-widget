import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'glamor';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Button from 'material-ui/Button';
import PaymentLayout from './PaymentLayout';
import OrderHeader from '../UI/OrderHeader';

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

const PaymentDetected = props => (
  <div>
    <OrderHeader
      order={props.order}
      title="Payment detected"
      subtitle="We're waiting for your payment to be confirmed"
      icon={<CircularProgress size={32} />}
    />
    <PaymentLayout {...props}>
      <div>
        <div />
        <div {...styles.textContainer}>
          <span {...styles.info}>
            <p>
              We will send your refill as soon as the transaction is completed.
              This can be slow if the network is very busy, but usually it only
              takes a few minutes!
            </p>
            This page will update with additional details when we have confirmed
            your payment.
          </span>
          <br />
          {props.order.paymentMethod === 'bitcoin' ? (
            <span
              {...styles.link}
              onClick={() =>
                window.open(
                  `https://transactioncheck.bitrefill.com/lookup/${
                    props.order.payment.address
                  }`,
                  '_blank'
                )
              }
            >
              Click here to see how it&#39;s going
            </span>
          ) : (
            <span {...styles.link}>When will I get my refill?</span>
          )}
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

PaymentDetected.propTypes = {
  order: PropTypes.object.isRequired,
};

export default PaymentDetected;

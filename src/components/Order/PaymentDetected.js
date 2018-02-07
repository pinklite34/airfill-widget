import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'glamor';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Button from 'material-ui/Button';
import PaymentLayout from './PaymentLayout';

const styles = {
  textContainer: css({
    display: 'block !important',
    lineHeight: '21px',
    marginRight: '48px',
  }),
  info: css({
    color: '#777777',
    fontSize: '14px'
  }),
  link: css({
    color: '#3e8fe4',
    fontSize: '14px',
    textDecoration: 'underline'
  }),
  button: css({
    marginTop: '12px'
  })
};

const PaymentDetected = props => {
  return (
    <div>
      <OrderHeader
        order={props.order}
        title="Payment detected"
        subtitle="We're waiting for your payment to be confirmed"
        icon={<CircularProgress size={32} />}
      />
      <PaymentLayout {...props}>
        <div>
          <div/>
          <div {...styles.textContainer}>
            <span {...styles.info}>
              This page will continue to update with more details about your refill.
              It is safe to leave this page or to buy another refill.
            </span>
            <br/>
            <span {...styles.link}>
              When will I get my refill?
            </span>
            <br/>
            <Button color="primary" raised {...styles.button} onClick={props.onReset}>
              Buy another refill
            </Button>
          </div>
        </div>
      </PaymentLayout>
    </div>
  );
};

PaymentDetected.propTypes = {
  order: PropTypes.object.isRequired
};

export default PaymentDetected;

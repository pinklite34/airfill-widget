import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Button from 'material-ui/Button';

import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';
import Error from './error.svg';
import { orderProp, paymentStatusProp, fnProp } from '../../lib/prop-types';

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
  button: css({
    marginTop: '12px',
  }),
};

export default function RefillFailed(props) {
  const {
    order,
    paymentStatus: { failureData = {} },
    refundAddress,
    onReset,
  } = props;

  let mailto =
    'mailto:support@bitrefill.com?subject=' +
    encodeURIComponent(`Failed Order (ID ${order.id})`);

  if (!refundAddress) {
    mailto +=
      '&body=' +
      encodeURIComponent(`Hello,
My order (ID ${
        order.id
      }) failed to process. I'd like a refund to be sent to <Replace This With Your Refund Address>.

Thanks!`);
  }

  let text;
  let action;
  const needRefund =
    failureData && failureData.needRefund != null
      ? failureData.needRefund
      : order.needRefund;

  // Order is already refunded / not charged
  if (!refundAddress && (needRefund === false || order.refunded === true)) {
    text =
      'We have sent you an automatic refund. Please make sure your details are correct and try again!';
    action = (
      <Button raised color="primary" onClick={onReset}>
        Send another refill
      </Button>
    );
  } else if (refundAddress) {
    text =
      'We have sent you an automatic refund. You should receive it within a few minutes.';
    action = (
      <p>
        <a
          href={`https://live.blockcypher.com/btc/address/${refundAddress}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to see how it&apos;s going
        </a>{' '}
        or <a href={mailto}>contact support@birefill.com</a>.
      </p>
    );
  } else {
    text =
      'Please use the button below to contact our support so that we can send you a refund.';
    action = (
      <Button raised href={mailto}>
        Contact Support
      </Button>
    );
  }

  return (
    <div>
      <OrderHeader
        order={order}
        title="Delivery error"
        subtitle="The refill could not be delivered to the target account"
        icon={<Error />}
      />
      <PaymentLayout {...props}>
        <div>
          <div />
          <div {...styles.textContainer}>
            <span {...styles.info}>{text}</span>
            <br />
            <br />
            {action}
          </div>
        </div>
      </PaymentLayout>
    </div>
  );
}

RefillFailed.propTypes = {
  order: orderProp,
  paymentStatus: paymentStatusProp,
  refundAddress: PropTypes.string,
  onReset: fnProp,
};

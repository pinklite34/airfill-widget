import PropTypes from 'prop-types';
import React from 'react';
import OrderStep from  '../../UI/OrderStep';
import Button from  '../../UI/Button';

const RefillFailed = ({ order, paymentStatus: { failureData = {} }, refundAddress, onReset }) => {
  let mailto = 'mailto:support@bitrefill.com?subject=' + encodeURIComponent(`Failed Order (ID ${order.id})`);

  if (!refundAddress) {
    mailto += '&body=' + encodeURIComponent(`Hello,
My order (ID ${order.id}) failed to process. I'd like a refund to be sent to <Replace This With Your Refund Address>.

Thanks!`);
  }

  let text;
  let action;
  const needRefund = failureData && failureData.needRefund != null
    ? failureData.needRefund
    : order.needRefund;

  // Order is already refunded / not charged
  if (!refundAddress && (needRefund === false || order.refunded === true)) {
    text = 'We have sent you an automatic refund. Please make sure your details are correct and try again!';
    action = <Button onClick={onReset}>Send another refill</Button>;
  } else if (refundAddress) {
    text = 'We have sent you an automatic refund. You should receive it within a few minutes.';
    action = (
      <p>
        <a href={`https://live.blockcypher.com/btc/address/${refundAddress}/`}
        target="_blank">Click here to see how it's going</a> or <a href={mailto}>contact support@birefill.com</a>.
      </p>
    );
  } else {
    text = 'Please use the button below to contact our support so that we can send you a refund.';
    action = <Button href={mailto}>Contact Support</Button>;
  }

  return (
    <div>
      <OrderStep done>Payment complete</OrderStep>
      <OrderStep done>Refill sent</OrderStep>
      <OrderStep error>Delivery failed</OrderStep>
      <p>
        For some reason we failed do deliver your refill. This can happen if you
        have typed the number incorrectly, if the number is not for a prepaid
        phone or if the operator you selected was not the right one.
      </p>
      <p>{text}</p>
      {action}
    </div>
  );
};

RefillFailed.propTypes = {
  order: PropTypes.object.isRequired
};

export default RefillFailed;

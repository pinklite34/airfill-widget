import React, {PropTypes} from 'react';

const RefillFailed = ({ order, refundAddress }) => {
  let mailto = 'mailto:support@bitrefill.com?subject=' + encodeURIComponent(`Failed Order (ID ${order.orderId})`);

  if (!refundAddress) {
    mailto += '&body=' + encodeURIComponent(`Hello,
My order (ID ${order.orderId}) failed to process. I'd like a refund to be sent to <Replace This With Your Refund Address>.

Thanks!`);
  }

  return (
    <div>
      <h3 className="order-step">
        <span className="order-step-symbol order-step-done">✓</span>
        Payment complete
      </h3>
      <h3 className="order-step">
        <span className="order-step-symbol order-step-done">✓</span>
        Refill sent
      </h3>
      <h3 className="order-step">
        <span className="order-step-symbol order-step-error">X</span>
        Delivery failed
      </h3>

      <p>
        For some reason we failed do deliver your refill. This can happen if you
        have typed the number incorrectly, if the number is not for a prepaid
        phone or if the operator you selected was not the right one.
      </p>
      <p>{refundAddress ?
          'We have sent you an automatic refund. You should receive it within a few minutes.' :
          'Please use the button below to contact our support so that we can send you a refund.'
        }
      </p>
      {refundAddress ? (
        <p>
          <a href={`https://live.blockcypher.com/btc/address/${refundAddress}/`}
          target="_blank">Click here to see how it's going</a> or <a href={mailto}>contact support@birefill.com</a>.
        </p>
      ) : (
        <a className="button" href={mailto}>Contact Support</a>
      )}
    </div>
  );
};

RefillFailed.propTypes = {
  order: PropTypes.object.isRequired
};

export default RefillFailed;

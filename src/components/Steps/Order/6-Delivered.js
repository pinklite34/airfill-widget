import React, {PropTypes} from 'react';
import Button from '../../UI/Button';

const RefillDelivered = ({paymentStatus: { deliveryData = {} }, onReset}) => {
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
        <span className="order-step-symbol order-step-done">✓</span>
        Refill Delivered
      </h3>

      <p>{deliveryData.pinInfo ?
        'You should receive an email with instructions any minute now. They are also displayed below. Thanks for using Bitrefill!' :
        'You should have received the topup on the target phone. Thanks for using Bitrefill!'
      }</p>

      {(deliveryData.pinInfo && deliveryData.pinInfo.pin) && (
        <p>
          <strong>Refill PIN</strong><br />{deliveryData.pinInfo.pin}
        </p>
      )}
      {(deliveryData.pinInfo && deliveryData.pinInfo.instructions) && (
        <p>
          <strong>Instructions</strong><br />
          {deliveryData.pinInfo.instructions}
        </p>
      )}
      {(deliveryData.pinInfo && deliveryData.pinInfo.other) && (
        <p>
          <strong>Other Info</strong><br />
          {deliveryData.pinInfo.other}
        </p>
      )}
      <Button onClick={onReset}>Send another refill</Button>
    </div>
  );
};

RefillDelivered.propTypes = {
  paymentStatus: PropTypes.object.isRequired,
  onReset: PropTypes.func.isRequired
};

export default RefillDelivered;

import React, {PropTypes} from 'react';
import OrderStep from  '../../UI/OrderStep';

const RefillDelivered = ({paymentStatus: { deliveryData = {} }, onReset}) => {
  return (
    <div>
      <OrderStep done>Payment complete</OrderStep>
      <OrderStep done>Refill sent</OrderStep>
      <OrderStep done>Refill Delivered</OrderStep>

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

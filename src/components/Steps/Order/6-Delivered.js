import React, {PropTypes} from 'react';
import Button from '../../UI/Button';

const RefillDelivered = ({paymentStatus: { deliveryData }}) => {
  return (
    <div>
      <h3>Refill Delivered!</h3>
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
    </div>
  );
};

RefillDelivered.propTypes = {
  paymentStatus: PropTypes.object.isRequired
};

export default RefillDelivered;

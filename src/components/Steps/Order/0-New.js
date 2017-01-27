import React, {PropTypes} from 'react';
import Button from '../../UI/Button';

const valueField = {
  'xbt': 'btcPrice',
  'eur': 'eurPrice',
  'usd': 'usdPrice'
};

const NewPayment = ({order, number, showEmailField, showBTCAddress, billingCurrency, paymentButtons}) => {
  const billingCurrencyDisplayName = billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
  const price = order[valueField[billingCurrency.toLowerCase()]] + ' ' + billingCurrencyDisplayName.toUpperCase();

  return (
    <div>
      <p>
        Please double check that your information below is correct before
        placing the order.
      </p>

      <dl className="refill-payment-order-info">
        <dt>Package</dt>
        <dd>{order.itemDesc}</dd>
        <dt>Phone number</dt>
        <dd>{number}</dd>
        {showEmailField ? [
          <dt key="0">Email address</dt>,
          <dd key="1">{order.email}</dd>
        ] : null}
        <dt>Price</dt>
        <dd>{price}</dd>
        <dt>Order ID</dt>
        <dd>{order.orderId}</dd>
      </dl>

      <div className="refill-payment-grid">
        {paymentButtons && (
          <div className="refill-payment-group">
            {paymentButtons.map(({title, callback}) =>
              <Button key={title} onClick={()=>callback(order)}>{title}</Button>
            )}
          </div>
        )}
        {showBTCAddress && (
          <div className="refill-payment-group">
            <p>Send <i>exactly</i> <strong>{order.btcPrice} BTC</strong> to address:</p>
            <input type="text" readOnly={true} value={order.payment.address} size="44" />
          </div>
        )}
      </div>
    </div>
  );
};

NewPayment.propTypes = {
  order: PropTypes.object.isRequired,
  showBTCAddress: PropTypes.bool.isRequired,
  paymentButtons: PropTypes.array
};

export default NewPayment;

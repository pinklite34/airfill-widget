import React, {PropTypes} from 'react';
import Button from '../../UI/Button';

const valueField = {
  'xbt': 'btcPrice',
  'eur': 'eurPrice',
  'usd': 'usdPrice'
};

const NewPayment = ({order, number, accountBalance, requireAccountBalance, showEmailField, showBTCAddress, billingCurrency, paymentButtons}) => {
  const billingCurrencyDisplayName = billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
  const price = order[valueField[billingCurrency.toLowerCase()]];
  const formattedPrice = price + ' ' + billingCurrencyDisplayName.toUpperCase();
  const canAfford = price <= accountBalance;
  const widgetRequireAccountBalance = requireAccountBalance;

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
        <dd>{formattedPrice}</dd>
        <dt>Order ID</dt>
        <dd>{order.orderId}</dd>
      </dl>

      <div className="refill-payment-grid">
        {paymentButtons && (
          <div className="refill-payment-group">
            {paymentButtons.map(({title, requireAccountBalance, lowBalanceText, callback}) => {
              // disabled | canAfford | requireAccountBalance | widgetRequireAccountBalance
              // true     | false     | undefined (!false)    | true
              // true     | false     | true                  | true
              // false    | false     | false                 | true
              // false    | false     | undefined (!false)    | false
              // true     | false     | true                  | false
              // false    | false     | false                 | false
              // false    | true      | any                   | any
              const disabled = !canAfford && ((widgetRequireAccountBalance && requireAccountBalance !== false) || requireAccountBalance);
              return [
                <Button key={title} onClick={()=>callback(order)} disabled={disabled}>{title}</Button>,
                (disabled ?
                  <small>{lowBalanceText || 'Your account balance is too low to use this option'}</small>
                : null)
              ]
            })}
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

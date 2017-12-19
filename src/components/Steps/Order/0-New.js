import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button';
import {isPhoneNumber, formatDisplayValue} from '../../../lib/number-helpers';

const valueField = {
  'xbt': 'btcPrice',
  'eur': 'eurPrice',
  'usd': 'usdPrice'
};

const PaymentContainer = styled.div`
  .refill-payment-order-info {
    dt, dd {
      float: left;
      min-width: 120px;
      white-space: nowrap;
      margin: 0;
      padding-bottom: 8px;
    }
    dt {
      float: left;
      clear: left;
      font-weight: bold;
    }
    dd {
      clear: right;
      min-width: 180px;
    }

    &:after {
      content: ' ';
      display: block;
      clear: both;
    }
  }

  .refill-payment-grid {
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
  }
  .refill-payment-group {
    flex: 1;
    margin: 0 32px;

    &:first-child {
      margin-left: 0;
      &:after, &:before { display: none; }
    }
    &:last-child {
      margin-right: 0;
    }

    &:before {
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      margin-left: -32px;
      background-color: rgba(0,0,0,0.16);
      width: 1px;
      content: "";
    }
    &:after {
      display: block;
      position: absolute;
      top: 50%;
      margin-left: -38px;
      margin-top: -1em;
      content: "or";
      background-color: hsl(130,5%,99%);
      padding: 0.5em 0 0.6em;
      line-height: 1;
      color: #999;
    }

    .refill-payment-button { display: block; }
    .refill-payment-button + small {
      display: block;
      margin: 0 0 4px;
    }
    .refill-payment-button + small + .refill-payment-button {
      margin-top: 12px;
    }
  }
`

const labelForNumberType = type =>
  isPhoneNumber(type)
    ? 'Phone number'
    : 'Account number';

const NewPayment = ({
  order,
  operator,
  number,
  country,
  accountBalance,
  requireAccountBalance,
  showEmailField,
  showBTCAddress,
  billingCurrency,
  paymentButtons
}) => {
  const billingCurrencyDisplayName = billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
  const price = order[valueField[billingCurrency.toLowerCase()]];
  const formattedPrice = price + ' ' + billingCurrencyDisplayName.toUpperCase();
  const canAfford = price <= accountBalance;
  const displayNumber = !operator.noNumber;
  const widgetRequireAccountBalance = requireAccountBalance;

  return (
    <PaymentContainer>
      <p>
        Please double check that your information below is correct before
        placing the order.
      </p>

      <dl className="refill-payment-order-info">
        <dt>Package</dt>
        <dd>{order.itemDesc}</dd>
        {displayNumber && <dt>{labelForNumberType(operator && operator.type)}</dt>}
        <dd>{formatDisplayValue(operator && operator.type, number, country)}</dd>
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
                <Button key={title} onClick={()=>callback(order)} disabled={disabled} className="refill-payment-button">{title}</Button>,
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
    </PaymentContainer>
  );
};

NewPayment.propTypes = {
  order: PropTypes.object.isRequired,
  showBTCAddress: PropTypes.bool.isRequired,
  paymentButtons: PropTypes.array
};

export default NewPayment;

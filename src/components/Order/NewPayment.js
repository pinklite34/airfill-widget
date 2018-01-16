import PropTypes from 'prop-types';
import React from 'react';

import { css } from 'glamor';
import Button from 'material-ui/Button';
import { isPhoneNumber, formatDisplayValue } from '../../lib/number-helpers';

import BitcoinAddress from '../UI/BitcoinAddress';

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice'
};

const styles = {
  list: css({
    display: 'block',
    margin: '30px 0',
    '> dt': {
      float: 'left',
      width: 120,
      fontWeight: 700
    },
    '> dd': {
      marginBottom: 8
    }
  }),
  paymentMethods: css({
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  }),
  paymentGroup: css({
    flex: 1,
    margin: '0 32px',

    '&:first-child': {
      '&:after, &:before': { display: 'none' }
    },

    '&:before': {
      display: 'block',
      position: 'absolute',
      top: 0,
      bottom: 0,
      marginLeft: -32,
      backgroundColor: 'rgba(0,0,0,0.16)',
      width: '1px',
      content: ' '
    },
    '&:after': {
      display: 'block',
      position: 'absolute',
      top: '50%',
      marginLeft: -38,
      marginTop: '-1em',
      content: 'or',
      backgroundColor: 'hsl(130,5%,99%)',
      padding: '0.5em 0 0.6em',
      lineHeight: 1,
      color: '#999'
    }
  }),
  buttonGroup: css({
    margin: -8
  }),
  button: css({
    margin: 8
  })
};

const labelForNumberType = type =>
  isPhoneNumber(type) ? 'Phone number' : 'Account number';

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
  const billingCurrencyDisplayName =
    billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
  const price = order[valueField[billingCurrency.toLowerCase()]];
  const formattedPrice = price + ' ' + billingCurrencyDisplayName.toUpperCase();
  const canAfford = price <= accountBalance;
  const displayNumber = !operator.noNumber;
  const widgetRequireAccountBalance = requireAccountBalance;

  return (
    <div>
      <p>
        Please double check that your information below is correct before
        placing the order.
      </p>

      <dl {...styles.list}>
        <dt>Package</dt>
        <dd>{order.itemDesc}</dd>
        {displayNumber && <dt>{labelForNumberType(operator && operator.type)}</dt>}
        <dd>
          {formatDisplayValue(operator && operator.type, number, country)}
        </dd>
        {showEmailField
          ? [<dt key="0">Email address</dt>, <dd key="1">{order.email}</dd>]
          : null}
        <dt>Price</dt>
        <dd>{formattedPrice}</dd>
        <dt>Order ID</dt>
        <dd>{order.orderId}</dd>
      </dl>

      <div {...styles.paymentMethods}>
        {paymentButtons && (
          <div {...styles.paymentGroup} {...styles.buttonGroup}>
            {paymentButtons.map(
              ({ title, requireAccountBalance, lowBalanceText, callback }, i) => {
                // disabled | canAfford | requireAccountBalance | widgetRequireAccountBalance
                // true     | false     | undefined (!false)    | true
                // true     | false     | true                  | true
                // false    | false     | false                 | true
                // false    | false     | undefined (!false)    | false
                // true     | false     | true                  | false
                // false    | false     | false                 | false
                // false    | true      | any                   | any
                const disabled =
                  !canAfford &&
                  ((widgetRequireAccountBalance &&
                    requireAccountBalance !== false) ||
                    requireAccountBalance);
                return [
                  <Button
                    {...styles.button}
                    raised
                    key={title}
                    onClick={() => callback(order)}
                    disabled={disabled}
                    primary={i === 0}
                  >
                    {title}
                  </Button>,
                  disabled ? (
                    <small>
                      {lowBalanceText ||
                        'Your account balance is too low to use this option'}
                    </small>
                  ) : null
                ];
              }
            )}
          </div>
        )}
        {showBTCAddress && (
          <div {...styles.paymentGroup}>
            <p>
              Send <i>exactly</i> <strong>{order.btcPrice} BTC</strong> to
              address:
            </p>
            <BitcoinAddress address={order.payment.address} />
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

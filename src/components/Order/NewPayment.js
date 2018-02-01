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
    '> dt': {
      float: 'left',
      textAlign: 'right',
      width: 120,
      fontWeight: 700,
      marginRight: '24px'
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
  }),
  package: css({
    fontSize: 16,
    color: '#323232',
    fontWeight: 'bold'
  }),
  payment: css({
    backgroundColor: '#fff',
    margin: '0 -16px -16px',
    '& > div': {
      display: 'flex',
      '& > div': {
        display: 'flex',
        alignItems: 'center'
      },
      '& > div:first-of-type': {
        justifyContent: 'flex-end',
        padding: 0,
        margin: 0,
        flex: '0 0 96px',
        fontWeight: 'bold',
        fontSize: '10px',
        color: '#777777',
        minHeight: '50px',
        textTransform: 'uppercase',
        paddingRight: '12px',
        '& > img': {
          width: '64px',
          height: 'auto'
        }
      },
      '& > div:last-of-type': {
        flex: 'auto',
        fontSize: '20px',
        color: '#323232',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }
    }
  }),
  topLabel: css({
    display: 'block',
    color: '#777777',
    fontWeight: 'bold',
    fontSize: '10px',
    paddingTop: '16px',
    marginLeft: '109px'
  }),
  label: css({
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#777777'
  }),
  changeButton: css({

  }),
  header: {
    base: css({
      display: 'flex',
      overflow: 'hidden'
    }),
    icon: css({
      flex: '0 80px'
    }),
    text: css({
      margin: 0,
      flex: 1
    }),
    label: css({
      float: 'left',
      margin: 0,
      padding: 0
    }),
    orderId: css({
      float: 'right',
      lineHeight: '31.5px',
      color: '#777777',
      fontSize: '12px'
    }),
    details: css({
      color: '#777777',
      fontSize: '14px'
    })
  }
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

  console.log(order);
  return (
    <div>
      <div {...styles.header.base}>
        <div {...styles.header.icon}>

        </div>
        <div {...styles.header.text}>
          <h2 {...styles.header.label}>
            Payment
          </h2>
          <div {...styles.header.orderId}>
            Order {order.id}
          </div>
          <br/>
          <br/>
          <div {...styles.header.details}>
            Confirm the details below to purchase the refill
          </div>
        </div>
      </div>

      <br/>

      <div {...styles.payment}>
        <span {...styles.topLabel}>Refill details</span>
        <div>
          <div>
            <img src={operator.logoImage} alt={operator.name} {...styles.logo} width={24} height={24} />
          </div>
          <div>
            <p>{operator.name}</p>
            <p {...styles.label}>
              {formatDisplayValue(operator && operator.type, number, country)}
            </p>
          </div>
        </div>

        <div>
          <div>
            <p>Price</p>
          </div>
          <div>
            <p>{formattedPrice}</p>
          </div>
        </div>

        {showEmailField && <div>
          <div>Email address</div>
          <div>{order.email}</div>
        </div>}

        <div>
          <div>
            <p>Pay with</p>
          </div>
          <div>
            Payment <Button {...styles.changeButton}>Change</Button>
          </div>
        </div>

        <div>
          <div/>
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
                        color={i === 0 ? 'primary' : 'default'}
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

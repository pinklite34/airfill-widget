import React from 'react';
import { css } from 'glamor';

const styles = {
  container: css({
    backgroundColor: '#fff',
    '& > div': {
      display: 'flex',
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        padding: '16px 0 16px 0'
      },
      '& > div:first-of-type': {
        justifyContent: 'flex-end',
        padding: 0,
        margin: 0,
        flex: '0 0 70px',
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
        '& > p': {
          padding: 0,
          margin: 0
        }
      }
    }
  }),
  providerRow: css({
    flexDirection: 'column !important',
    alignItems: 'flex-start !important',
  }),
  topLabel: css({
    display: 'block',
    color: '#777777',
    fontWeight: 'bold',
    fontSize: '10px',
    textTransform: 'uppercase'
  }),
  label: css({
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#777777'
  }),
  changeButton: css({
    color: '#3e8fe4 !important',
    fontWeight: 'bold !important',
    marginLeft: '12px'
  }),
  paymentLabel: css({
    fontSize: '12px !important'
  }),
  logo: css({
    maxWidth: 48
  })
};

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice'
};

const PaymentLayout = ({
  children,
  operator,
  number,
  country,
  billingCurrency,
  order
}) => {

  const billingCurrencyDisplayName =
    billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
  const price = order[valueField[billingCurrency.toLowerCase()]];
  const formattedPrice = price + ' ' + billingCurrencyDisplayName.toUpperCase();

  return (
    <div {...styles.container}>

      <div>
        <div>
          <img src={operator.logoImage} alt={operator.name} {...styles.logo} />
        </div>
        <div {...styles.providerRow}>
          <span {...styles.topLabel}>Refill details</span>
          <p>{operator.name}</p>
          <p {...styles.label}>
            {number}
          </p>
        </div>
      </div>

      <div>
        <div>
          Price
        </div>
        <div>
          {formattedPrice}
        </div>
      </div>

      {children}
    </div>
  );
};

export default PaymentLayout;

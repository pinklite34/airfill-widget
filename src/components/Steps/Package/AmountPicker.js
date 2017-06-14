import React from 'react';
import styled, {css} from 'styled-components';

const AmountList = styled.ul`
  margin: 0 -2px;
  padding: 0;
  list-style: none;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  input {
    display: block;
    position: absolute;
    left: 14px;
    top: 50%;
    margin-top: -8px;
    height: 16px;
    width: 16px;
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    z-index: -1;
  }

  .amount-item {
    position: relative;
    padding: 2px;
    display: flex;
    max-width: 100px;
    min-width: 90px;
    flex: 1 1 auto;
    text-align: center;

    &.amount-item-unavailable .amount-item-label {
      opacity: 0.3;
    }
    &.amount-item-disabled {
      .amount-item-label {
        cursor: not-allowed;
      }
    }
  }

  .amount-item-label {
    display: inline-block;
    border: 1px solid #aaa;
    background: #f0f0f0 linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.03));
    border-radius: 4px;
    padding: 12px 6px;
    margin: 0;
    transition: all 250ms;
    box-shadow: 0 0 0 1px transparent;
    opacity: 0.6;
    flex: 1 1 auto;

    @media (max-width: 560px) {
      flex-basis: 140px;
    }
    @media (max-width: 480px) {
      flex-basis: 120px;
    }
  }
  .amount-item-label:hover,
  input:focus + .amount-item-label,
  input:active + .amount-item-label,
  input:checked + .amount-item-label {
    cursor: pointer;
    background-color: #fff;
    opacity: 1;
  }
  input:checked + .amount-item-label {
    border-color: #B0CB0B;
    background-color: #fff;
    box-shadow: 0 0 0 2px #B0CB0B, inset 0 0 2px #fff, 0 1px 16px rgba(0,0,0,0.2);
    opacity: 1;
  }
  .amount-value,
  .amount-separator,
  .amount-btc {
    display: block;
    white-space: nowrap;
    font-style: normal;
    line-height: 1.5;
  }
  .amount-value {
    font-size: 15px;
    color: #090909;
  }
  .amount-separator {
    font-size: 8px;
    text-transform: uppercase;
    color: #999;
  }
  .amount-btc {
    font-size: 12px;
    color: #444;
  }

  ${({showAsList}) => showAsList && css`
    display: block;
    margin: 0 -4px;
    columns: 2 230px;
    column-gap: 0;
    max-width: 520px;
    -webkit-perspective: 1;
    font-size: 14px;
    text-align: left;

    input {
      opacity: 0.6;
      z-index: 1;
    }

    .amount-item {
      break-inside: avoid-column;
      padding: 4px;
      max-width: none;
      max-width: 300px;
      margin: 0 auto;
    }

    .amount-item-label {
      display: block;
      text-align: right;
      padding: 5px 8px 5px 32px;
    }


    .amount-value,
    .amount-separator,
    .amount-btc {
      display: inline-block;
      white-space: nowrap;
      line-height: 24px;
      vertical-align: middle;
    }
    .amount-separator {
      padding: 0 4px;
    }

    .amount-value {
      float: left;
    }
    .amount-value,
    .amount-btc {
        font-size: 14px;
    }
    input:checked {
      opacity: 1;
    }`
  }
`

const AmountPicker = ({
  packages=[], selected, currency, billingCurrency, accountBalance, requireAccountBalance, onChange
}) => (
  <AmountList showAsList={packages.length > 12}>
    {packages.map(pkg => {
      const {value} = pkg;

      const billingCurrencyDisplayName = billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
      const price = pkg[billingCurrencyDisplayName.toLowerCase() + 'Price']
      const formattedPrice = price + ' ' + billingCurrencyDisplayName.toUpperCase();
      const canAfford = price <= accountBalance;
      const disabled = !canAfford && requireAccountBalance;

      return (
        <li
          className={'amount-item ' + (canAfford ?
            'amount-item-available ' : 'amount-item-unavailable '
          ) + (disabled ?
            'amount-item-disabled ' : ''
          )}
          key={'' + value + currency}
        >
          <input
            type="radio"
            name="amount"
            id={'amount_' + value}
            value={value}
            checked={selected && Number(value) === selected}
            disabled={disabled}
            readOnly
          />
          <label htmlFor={'amount_' + value} className="amount-item-label" onClick={()=>!disabled && onChange(value)}>
            <var className="amount-value">{value} {currency}</var>
            <span className="amount-separator">you pay</span>
            <var className="amount-billing-price">{formattedPrice}</var>
          </label>
        </li>
      );
    })}
  </AmountList>
);

export default AmountPicker;

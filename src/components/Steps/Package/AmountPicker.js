import React from 'react';
import './AmountPicker.scss';

const AmountPicker = ({
  packages, selected, currency, billingCurrency, onChange
}) => {
  const showAsList = packages && packages.length > 12;

  return (
    <ul className={`amount-item-container ${showAsList ? 'amount-item-container-list' : ''}`}>
      {packages.map(pkg => {
        const {value} = pkg;

        const billingCurrencyDisplayName = billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
        const price = pkg[billingCurrencyDisplayName.toLowerCase() + 'Price']
                        + ' ' + billingCurrencyDisplayName.toUpperCase();

        return (
          <li className="amount-item" key={'' + value + currency}>
            <input
              type="radio"
              name="amount"
              id={'amount_' + value}
              value={value}
              className="pricelist_item"
              checked={selected && value === selected}
              onChange={()=>onChange(value)}
            />
            <label htmlFor={'amount_' + value} className="amount-item-label" onClick={()=>onChange(value)}>
              <var className="amount-value">{value} {currency}</var>
              <span className="amount-separator">you pay</span>
              <var className="amount-billing-price">{price}</var>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default AmountPicker;

import React from 'react';
import './AmountPicker.scss';

const AmountPicker = ({
  packages, selected, currency, billingCurrency, accountBalance, requireAccountBalance, onChange
}) => {
  const showAsList = packages && packages.length > 12;

  return (
    <ul className={`amount-item-container ${showAsList ? 'amount-item-container-list' : ''}`}>
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
              className="pricelist_item"
              checked={selected && value === selected}
              disabled={disabled}
            />
            <label htmlFor={'amount_' + value} className="amount-item-label" onClick={()=>!disabled && onChange(value)}>
              <var className="amount-value">{value} {currency}</var>
              <span className="amount-separator">you pay</span>
              <var className="amount-billing-price">{formattedPrice}</var>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default AmountPicker;

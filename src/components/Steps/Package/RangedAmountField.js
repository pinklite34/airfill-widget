import React from 'react';
import styled from 'styled-components';
import Field from '../../UI/Field';

const Input = styled.input`
  min-width: 8em;
  margin-right: 8px;
  padding-right: 3em;
  padding: 8px;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`
const Label = styled.label`
  width: 3em;
  position: relative;
  left: -3.25em;
  margin-right: -2.25em;
  background-color: #fff;
  color: #777;
`
const Price = styled.strong`
  color: #5ab76b;
`

const RangedAmountField = ({
  amount, range, currency, billingCurrency, onChange, onBlur
}) => {
  let error;

  amount = Number(amount);
  let currentPrice = amount * range.userPriceRate;

  // Round decimal ranges since we do not accept them atm
  const min = Math.ceil(range.min);
  const max = Math.floor(range.max);

  // BTC
  if (billingCurrency === 'XBT') {
    currentPrice = Math.ceil(currentPrice / 100) / 1000000;
  } else { // USD or EUR
    currentPrice = currentPrice.toFixed(2);
  }

  const displayedCurrency = billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
  const hint = (
    <span className="">
      You pay <Price className="amount-ranged-btc-price">{currentPrice} {displayedCurrency}</Price>.
      Min: <strong>{min} {currency}</strong>, max: <strong>{max} {currency}</strong>.
    </span>
  );

  // Value not an integer
  if ((amount % 1) !== 0) {
    error = (
      <span>
        <strong>{amount}</strong> is not an accepted amount. Please
        choose <strong>{Math.floor(amount)} {currency}</strong> or
        <strong> {Math.ceil(amount)} {currency}</strong>.
      </span>
    );
  }
  // Value out of range
  else if (amount < min || amount > max) {
    error = (
      <span>
        Please choose an amount between <strong>{min} {currency}
        </strong> and <strong>{max} {currency}</strong>.
      </span>
    );
  }
  // Value not a correct step
  else if (range.step && (amount % range.step) !== 0) {
    const lowerStep = amount - (amount % range.step);
    error = (
      <span>
        <strong>{amount}</strong> is not an accepted amount. Please
        choose <strong>{lowerStep} {currency}</strong> or
        <strong>{(lowerStep + range.step)} {currency}</strong>.
      </span>
    );
  }

  return (
    <Field
      label="...or enter a custom amount"
      htmlFor="custom_amount"
      hint={hint}
      error={error}
    >
      <div>
        <Input
          type="number"
          id="custom_amount"
          name="custom_amount"
          className="amount-ranged-input"
          min={min}
          max={max}
          step={range.step}
          value={String(amount)}
          placeholder="e.g. 200"
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          onBlur={(e) => onBlur(parseInt(e.target.value, 10))}
        />
        <Label htmlFor="custom_amount">{currency}</Label>
      </div>
    </Field>
  );
};

export default RangedAmountField;

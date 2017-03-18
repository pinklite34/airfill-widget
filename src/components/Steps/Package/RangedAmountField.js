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
  amount, range, currency, billingCurrency, onChange
}) => {
  let error;
  let currentPrice;

  if (billingCurrency === 'XBT') {
    currentPrice = Math.ceil(amount * range.customerSatoshiPriceRate / 10000) / 10000;
  } else {
    currentPrice = (amount * range.customerPriceRate).toFixed(2);
  }

  const displayedCurrency = billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
  const hint = (
    <span className="">
      You pay <Price className="amount-ranged-btc-price">{currentPrice} {displayedCurrency}</Price>.
      Min: <strong>{range.min} {currency}</strong>, max: <strong>{range.max} {currency}</strong>.
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
  else if (amount < range.min || amount > range.max) {
    error = (
      <span>
        Please choose an amount between <strong>{range.min} {currency}
        </strong> and <strong>{range.max} {currency}</strong>.
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
          min={range.min}
          max={range.max}
          step={range.step}
          value={amount}
          placeholder="e.g. 200"
          onChange={(e)=>onChange(e.target.value)}
        />
        <Label htmlFor="custom_amount">{currency}</Label>
      </div>
    </Field>
  );
};

export default RangedAmountField;

import React from 'react';
import Field from '../../UI/Field';
import './RangedAmountField.scss';

const RangedAmountField = ({
  amount, range, currency, onChange
}) => {
  let error;
  const btcAmount = Math.ceil(amount * range.customerSatoshiPriceRate / 10000) / 10000;
  const hint = (
    <span className="">
      You pay <strong className="amount-ranged-btc-price">{btcAmount} BTC</strong>.
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
      {/*<span class="input-group-addon"><span class="input-text">{{currency}}</span></span>*/}
      <div>
        <input
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
        <label htmlFor="custom_amount" className="amount-ranged-currency">{currency}</label>
        <span className="amount-ranged-range">

        </span>
      </div>
    </Field>
  );
};

export default RangedAmountField;

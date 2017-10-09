import React from 'react';
import { css } from 'glamor';

import { Input } from 'react-toolbox/lib/input';

import { getDisplayName, satoshiToBTC } from '../../lib/currency-helpers';

import SectionTitle from '../UI/SectionTitle';

const styles = {
  container: css({
    marginTop: 16
  }),
  row: css({
    display: 'flex',
    backgroundColor: '#fff',
    margin: '0 -16px',
    borderTop: '1px solid rgba(0,0,0,0.08)',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    padding: '8px 16px',
    alignItems: 'center'
  }),
  input: css({
    width: 160,
    display: 'inline-block',
    '& > div': {
      padding: 0
    }
  }),
  label: css({
    position: 'relative',
    display: 'inline-block',
    width: 40,
    left: -40,
    marginRight: -40,
    backgroundColor: '#FAFAFA',
    color: '#777',
    padding: 4
  }),
  meta: css({
    marginLeft: 8,
    fontSize: 12
  })
};

const Ranged = ({ amount, range, currency, billingCurrency, onChange }) => {
  const min = Math.ceil(range.min);
  const max = Math.floor(range.max);
  const step = range.step;

  const cost = amount * range.userPriceRate;
  const displayableCost = billingCurrency === 'XBT' ? satoshiToBTC(cost) : cost;

  return (
    <div {...styles.container}>
      <SectionTitle>...or select custom amount</SectionTitle>
      <div {...styles.row}>
        <div {...styles.field}>
          <div {...styles.input}>
            <Input
              type="number"
              min={min}
              max={max}
              step={step}
              value={amount}
              onChange={onChange}
              onBlur={() =>
                amount > range.max
                  ? onChange(range.max)
                  : amount < range.min ? onChange(range.min) : null}
            />
          </div>
          <label {...styles.label} htmlFor="custom_amount">
            {currency}
          </label>
        </div>
        <div {...styles.meta}>
          <div>
            <strong>Min:</strong> {range.min} {currency}{' '}
            <strong>Max:</strong> {range.max} {currency}
          </div>
          <div>
            <strong>You pay:</strong> {displayableCost}{' '}
            {getDisplayName(billingCurrency)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranged;

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
    backgroundColor: '#fff',
    margin: '0 -16px',
    borderTop: '1px solid rgba(0,0,0,0.08)',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    padding: '8px 16px'
  }),
  field: css({
    display: 'flex',
    flexDirection: 'row'
  }),
  input: css({
    display: 'inline-block',
    width: 120,
    padding: '0 !important'
  }),
  label: css({
    position: 'relative',
    display: 'inline-block',
    width: 48,
    left: -48,
    marginRight: -48,
    backgroundColor: '#FFF',
    color: '#777',
    padding: '4px 12px 4px 0',
    textAlign: 'right'
  }),
  meta: css({
    color: 'rgba(0,0,0,0.8)',
    marginTop: 8,
    fontSize: 12
  }),
  cost: css({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
    padding: '0 12px'
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
          <div>
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
              className={`${styles.input}`}
            />
            <label {...styles.label} htmlFor="custom_amount">
              {currency}
            </label>
          </div>
          <div {...styles.cost}>
            <strong>
              {displayableCost} {getDisplayName(billingCurrency)}
            </strong>
          </div>
        </div>
        <div {...styles.meta}>
          <div>
            <strong>Min:</strong> {range.min} {currency} <strong>Max:</strong>{' '}
            {range.max} {currency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranged;

import React from 'react';
import { css } from 'glamor';

import { Input } from 'react-toolbox/lib/input';

import SectionTitle from '../UI/SectionTitle';

const styles = {
  container: css({
    marginTop: 16
  }),
  field: css({
    backgroundColor: '#fff',
    margin: '0 -16px',
    borderTop: '1px solid rgba(0,0,0,0.08)',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    padding: '8px 16px'
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
    width: 40,
    left: -40,
    backgroundColor: '#FAFAFA',
    color: '#777',
    padding: 4
  })
};

const Ranged = ({ amount, range, currency, billingCurrency, onChange }) => {
  const min = Math.ceil(range.min);
  const max = Math.floor(range.max);
  const step = range.step;

  return (
    <div {...styles.container}>
      <SectionTitle>...or select custom amount</SectionTitle>
      <div {...styles.field}>
        <div {...styles.input}>
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            value={amount}
            onChange={onChange}
          />
        </div>
        <label {...styles.label} htmlFor="custom_amount">
          {currency}
        </label>
      </div>
    </div>
  );
};

export default Ranged;

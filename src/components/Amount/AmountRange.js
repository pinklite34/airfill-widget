import React from 'react';
import { css } from 'glamor';

import Input from 'material-ui/Input';

import { getDisplayName, satoshiToBTC } from '../../lib/currency-helpers';
import {
  rangeProp,
  currencyProp,
  amountProp,
  fnProp,
} from '../../lib/prop-types';

import AmountPackage from './AmountPackage';
import SectionTitle from '../UI/SectionTitle';

import Settings from './settings.svg';

const styles = {
  container: css({
    marginTop: 16,
  }),
  row: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: '0 -16px',
    borderTop: '1px solid rgba(0,0,0,0.08)',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    padding: '8px 16px',
  }),
  settings: css({
    flex: '0 0 auto',
    marginRight: 16,
    width: 20,
    height: 20,
    fill: 'rgba(0,0,0,0.8)',
  }),
  input: css({
    display: 'inline-block',
    width: 100,
    padding: '0 !important',
    '& input': {
      fontFamily: 'inherit',
      padding: '0 !important',
      color: '#000',
      fontWeight: 500,
    },
  }),
  label: css({
    position: 'relative',
    display: 'inline-block',
    color: '#000',
    width: 48,
    left: -48,
    marginRight: -48,
    backgroundColor: '#FFF',
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 1,
  }),
  cost: css({
    lineHeight: '20px',
  }),
  title: css({
    marginLeft: 36,
  }),
  meta: css({
    background: 'rgba(0,0,0,0.1)',
    padding: 4,
    fontSize: 12,
    lineHeight: '16px',
    color: '#333',
    marginLeft: 16,
  }),
};

export default function AmountRange({
  amount,
  range,
  currency,
  billingCurrency,
  onChange,
}) {
  const min = Math.ceil(range.min);
  const max = Math.floor(range.max);
  const step = range.step;

  const cost = amount * range.userPriceRate;
  const displayableCost =
    billingCurrency === 'XBT' ? satoshiToBTC(cost) : cost.toFixed(2);

  return (
    <div {...styles.container}>
      <SectionTitle {...styles.title}>...or select custom amount</SectionTitle>
      <div {...styles.row}>
        <Settings {...styles.settings} />
        <AmountPackage
          name={
            <div>
              <Input
                type="number"
                min={min}
                max={max}
                step={step}
                value={amount}
                onChange={e => onChange(e.target.value)}
                onBlur={() =>
                  amount > range.max
                    ? onChange(range.max)
                    : amount < range.min ? onChange(range.min) : null
                }
                className={`${styles.input}`}
                id="custom_amount"
              />
              <label {...styles.label} htmlFor="custom_amount">
                {currency}
              </label>
            </div>
          }
          price={
            <span {...styles.cost}>
              {displayableCost > 0 ? displayableCost : '0'}{' '}
              {getDisplayName(billingCurrency)}
            </span>
          }
        />
        <div {...styles.meta}>
          <div>
            <strong>Min:</strong> {range.min} {getDisplayName(currency)}
          </div>
          <div>
            <strong>Max:</strong> {range.max} {getDisplayName(currency)}
          </div>
        </div>
      </div>
    </div>
  );
}

AmountRange.propTypes = {
  amount: amountProp,
  range: rangeProp,
  currency: currencyProp,
  billingCurrency: currencyProp,
  onChange: fnProp,
};

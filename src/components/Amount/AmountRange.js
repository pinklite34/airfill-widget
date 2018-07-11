import React from 'react';
import styled, { css } from 'react-emotion';

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

const styles = {
  container: css`
    margin-top: 16px;
  `,
  row: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    margin: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    padding: 8px 16px;
  `,
  input: css`
    display: inline-block;
    width: 100px;
    padding: 0 !important;

    & input {
      font-family: inherit;
      padding: 0 !important;
      color: #000;
      font-weight: 500;
    }
  `,
  label: css`
    position: relative;
    display: inline-block;
    color: #000;
    width: 48px;
    left: -48px;
    margin-right: -48px;
    background-color: #fff;
    text-align: right;
    font-size: 16px;
    line-height: 1;
  `,
  cost: css`
    line-height: 20px;
  `,
  title: css`
    margin-left: 36px;
  `,
  meta: css`
    background: rgba(0, 0, 0, 0.1);
    padding: 4px;
    font-size: 12px;
    line-height: 16px;
    color: #333;
    margin-left: 16px;
  `,
};

const RangeContainer = styled('div')`
  margin-left: 32px;
`;

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
    <div className={styles.container}>
      <SectionTitle className={styles.title}>
        {'...or select custom amount'}
      </SectionTitle>
      <div className={styles.row}>
        <RangeContainer>
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
                      : amount < range.min
                        ? onChange(range.min)
                        : null
                  }
                  className={`${styles.input}`}
                  id="custom_amount"
                />
                <label className={styles.label} htmlFor="custom_amount">
                  {currency}
                </label>
              </div>
            }
            price={
              <span className={styles.cost}>
                {displayableCost > 0 ? displayableCost : '0'}{' '}
                {getDisplayName(billingCurrency)}
              </span>
            }
          />
        </RangeContainer>

        <div className={styles.meta}>
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

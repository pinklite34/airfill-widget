import React from 'react';
import styled from 'react-emotion';

import Input from 'material-ui/Input';

import { getDisplayName, satoshiToBTC } from '../../lib/currency-helpers';
import {
  rangeProp,
  currencyProp,
  amountProp,
  fnProp,
  configProp,
} from '../../lib/prop-types';

import AmountPackage from './AmountPackage';
import SectionTitle from '../UI/SectionTitle';
import Text from '../UI/Text';

const Container = styled('div')`
  margin-top: 16px;
`;

const RangeContainer = styled('div')`
  margin-left: 32px;
`;

const Title = styled(SectionTitle)`
  margin-left: 36px;
`;

const Row = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  margin: 0;
  border-top: ${p => p.theme.bd.primary};
  border-bottom: ${p => p.theme.bd.primary};
  padding: 8px 16px;
`;

const StyledInput = styled(Input)`
  display: inline-block;
  width: 100px;
  padding: 0 !important;

  & input {
    font-family: inherit;
    padding: 0 !important;
    color: #000;
    font-weight: 500;
  }
`;

const Label = styled('label')`
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
`;

const Cost = styled('span')`
  line-height: 20px;
`;

const Meta = styled('div')`
  background: rgba(0, 0, 0, 0.1);
  padding: 4px;
  font-size: 12px;
  line-height: 16px;
  color: #333;
  margin-left: 16px;
`;

export default function AmountRange({
  amount,
  range,
  currency,
  billingCurrency,
  onChange,
  config,
}) {
  const min = Math.ceil(range.min);
  const max = Math.floor(range.max);
  const step = range.step;

  const cost = amount * range.userPriceRate;
  const displayableCost =
    billingCurrency === 'XBT' ? satoshiToBTC(cost) : cost.toFixed(2);

  const displayedCurrency = getDisplayName(currency);
  const showPrice = !config.coin || config.coin === 'bitcoin';

  return (
    <Container>
      <Title
        text={{
          id: 'title.customamount',
          children: '...or select custom amount',
        }}
      />
      <Row>
        <RangeContainer>
          <AmountPackage
            name={
              <div>
                <StyledInput
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
                  id="custom_amount"
                />
                <Label htmlFor="custom_amount">{currency}</Label>
              </div>
            }
            price={
              showPrice && (
                <Cost>
                  {displayableCost > 0 ? displayableCost : '0'}{' '}
                  {getDisplayName(billingCurrency)}
                </Cost>
              )
            }
          />
        </RangeContainer>

        <Meta>
          <div>
            <Text id="amount.min">
              <strong>Min:</strong> {{ min }} {{ displayedCurrency }}
            </Text>
          </div>
          <div>
            <Text id="amount.max">
              <strong>Max:</strong> {{ max }} {{ displayedCurrency }}
            </Text>
          </div>
        </Meta>
      </Row>
    </Container>
  );
}

AmountRange.propTypes = {
  amount: amountProp,
  range: rangeProp,
  currency: currencyProp,
  billingCurrency: currencyProp,
  onChange: fnProp,
  config: configProp,
};

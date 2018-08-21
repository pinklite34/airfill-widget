import {
  Amount,
  BillingCurrency,
  Config,
  Currency,
  RangeProp,
} from 'lib/prop-types';
import Input from 'material-ui/Input';
import * as React from 'react';
import styled from 'react-emotion';

import { getDisplayName, satoshiToBTC } from '../../lib/currency-helpers';
import Flex from '../UI/Flex';
import SectionTitle from '../UI/SectionTitle';
import Text from '../UI/Text';

const Container = styled('div')`
  margin-top: 16px;
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
` as any;

interface AmountRangeProps {
  amount: Amount;
  range: RangeProp;
  currency: Currency;
  billingCurrency: BillingCurrency;
  onChange: (amount: number) => void;
  config: Config;
  [x: string]: any;
}

export default function AmountRange(props: AmountRangeProps) {
  const { amount, range, currency, billingCurrency, onChange, config } = props;
  const min = Math.ceil(range.min);
  const max = Math.floor(range.max);
  const step = range.step;

  const cost = Number(amount) * range.userPriceRate;
  const displayableCost =
    billingCurrency === 'XBT' ? satoshiToBTC(cost) : cost.toFixed(2);

  const displayedCurrency = getDisplayName(currency);
  const showPrice = !config.coin || config.coin === 'bitcoin';

  return (
    <Container>
      <Text type="p" id="title.customamount">
        Select custom amount
      </Text>
      <Flex row>
        <div>
          <Text type="p">
            Min {min} {displayedCurrency}
          </Text>
          <Text type="p">
            Max {max} {displayedCurrency}
          </Text>
        </div>
        <input />
      </Flex>
    </Container>
  );

  /*  return (
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
            // @ts-ignore
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
            // @ts-ignore
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
  ); */
}

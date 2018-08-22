import {
  Amount,
  BillingCurrency,
  Config,
  Currency,
  RangeProp,
} from 'lib/prop-types';
import * as React from 'react';
import styled from 'react-emotion';

import { getDisplayName, satoshiToBTC } from '../../lib/currency-helpers';
import Flex from '../UI/Flex';
import Text from '../UI/Text';

const Container = styled(Flex)`
  margin: 16px;
  width: 100%;
`;

const InputContainer = styled(Flex)`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  padding: 6px;
`;

const Input = styled('input')`
  border: none;
`;

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
    <Container centered>
      <Flex row centered>
        <div style={{ flex: 3 }}>
          <Flex>
            <Flex row justifyContent="none">
              <InputContainer row>
                <Input
                  value={amount}
                  onChange={e => onChange(Number(e.target.value))}
                />
                <Text type="p" size="12px">
                  {displayedCurrency}
                </Text>
              </InputContainer>
            </Flex>
            <Flex row justifyContent="none">
              <Text type="p" padding="0 12px 0 0">
                <strong>Min:</strong> {min} {displayedCurrency}
              </Text>
              <Text type="p">
                <strong>Max:</strong> {max} {displayedCurrency}
              </Text>
            </Flex>
          </Flex>
        </div>
        {showPrice && (
          <div style={{ flex: 2, width: '100%', height: '100%' }}>
            <p style={{ maxWidth: '100%' }}>
              You pay{' '}
              <strong>{displayableCost > 0 ? displayableCost : '0'} </strong>
              {getDisplayName(billingCurrency)}
            </p>
          </div>
        )}
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

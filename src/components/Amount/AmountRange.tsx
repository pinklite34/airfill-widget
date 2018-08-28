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
import DeviceInfo from '../../lib/DeviceInfo';
import CardShadow from '../UI/CardShadow';
import Flex from '../UI/Flex';
import Text from '../UI/Text';

const Container = styled(Flex)`
  margin: 0 auto;
  width: 70%;
  padding-top: 16px;
`;

const PriceLabel = styled(Text)`
  text-align: left;
  font-size: 14px;

  & > strong {
    text-align: left;
  }

  padding: 6px;

  @media (max-width: ${p => p.theme.bp.mobile}) {
    padding: 0;
    text-align: center;
    & > strong {
      text-align: center;
    }
  }

  width: 100%;
`;

const InputContainer = styled(Flex)`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  padding: 6px;
  width: 100%;
`;

const Input = styled('input')`
  border: none;
  width: 100%;
  font-size: 16px;
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

  const cost = Number(amount) * range.userPriceRate;
  const displayableCost =
    billingCurrency === 'XBT' ? satoshiToBTC(cost) : cost.toFixed(2);

  const displayedCurrency = getDisplayName(currency);
  const showPrice =
    !config.coin || config.coin === 'bitcoin' || config.coin === 'lightning';

  return (
    <DeviceInfo>
      {({ is }) => (
        <CardShadow color="white">
          <Container row={!is.mobile} centered>
            <div style={{ flex: 3 }}>
              <Flex>
                <Flex row justifyContent="none">
                  <InputContainer row>
                    <Input
                      value={amount}
                      required
                      autoFocus
                      onChange={e => {
                        const val = Number(e.target.value);

                        if (!isNaN(val)) {
                          onChange(val);
                        }
                      }}
                    />
                    <Text type="p" size="16px">
                      {displayedCurrency}
                    </Text>
                  </InputContainer>
                </Flex>
                <Flex
                  row
                  justifyContent={!is.mobile && 'unset'}
                  centered={is.mobile}
                >
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
              <div
                style={{
                  flex: 2,
                  width: '100%',
                  alignSelf: 'flex-start',
                }}
              >
                <PriceLabel type="p" id="package.userprice">
                  You pay <strong>{{ displayableCost }} </strong>
                  {getDisplayName(billingCurrency)}
                </PriceLabel>
              </div>
            )}
          </Container>
        </CardShadow>
      )}
    </DeviceInfo>
  );
}

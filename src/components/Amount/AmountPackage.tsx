import * as React from 'react';
import styled from 'react-emotion';
import Card from '../UI/Card';
import CardShadow from '../UI/CardShadow';
import Text from '../UI/Text';

const Container = styled(CardShadow)`
  width: 140px;
  height: 140px;
  margin: 6px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: ${(p: any) => p.disabled || 'pointer'};

  background-color: ${p => p.disabled && p.theme.bg.disabled};

  border-radius: 4px;
  border: 2px
    ${(p: any) =>
      p.disabled ? p.theme.bg.disabled : p.selected ? p.theme.brand : '#fff'}
    solid;

  transition: border 0.2s ease;
`;

const Name = styled('p')`
  font-size: 24px;
`;

interface AmountPackageProps {
  currency: string;
  price: number;
  disabled?: boolean;
  name: string;
  selected: boolean;
  hidePrice?: boolean;
  onClick?: (...a) => any;
  showPrice?: boolean;
}

export default function AmountPackage({
  currency,
  price,
  name,
  disabled,
  selected,
  onClick,
  showPrice = true,
}: AmountPackageProps) {
  return (
    <Container disabled={disabled} selected={selected} onClick={onClick}>
      <Text type="p" size="26px">
        {name}
      </Text>
      {showPrice && (
        <React.Fragment>
          <Text type="p" size="12px" margin="0">
            You pay
          </Text>
          <Text type="p">{`${price} ${currency}`}</Text>
        </React.Fragment>
      )}
    </Container>
  );
}

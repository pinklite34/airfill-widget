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

  border-radius: 4px;
  border: 2px ${(p: any) => (p.selected ? '#3E8FE4' : '#fff')} solid;

  transition: border 0.2s ease;

  &:hover {
    border: 2px #3e8fe4 solid;
  }
`;

const Name = styled('p')`
  font-size: 24px;
`;

interface AmountPackageProps {
  // currency: string;
  // price: number;
  // disabled?: boolean;
  // name: string;
  // selected: boolean;
  [x: string]: any;
}

export default function AmountPackage({
  currency,
  price,
  name,
  disabled,
  selected,
  onClick,
  ...props
}: AmountPackageProps) {
  console.log(props);
  return (
    <Container disabled={disabled} selected={selected} onClick={onClick}>
      <Text type="p" size="26px">
        {name}
      </Text>
      <Text type="p" size="12px" margin="0">
        You pay
      </Text>
      <Text type="p">{`${price} ${currency}`}</Text>
    </Container>
  );
}

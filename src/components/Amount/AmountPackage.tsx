import * as React from 'react';
import styled from 'react-emotion';
import Card from '../UI/Card';
import CardShadow from '../UI/CardShadow';

const Container = styled(CardShadow)`
  width: 140px;
  height: 140px;
  margin: 6px;

  border-radius: 4px;
  border: 2px ${(p: any) => (p.selected ? '#3E8FE4' : '#fff')} solid;

  transition: border 0.2s ease;

  &:hover {
    border: 2px #3e8fe4 solid;
  }
`;

interface AmountPackageProps {
  // currency: string;
  [x: string]: any;
}

export default function AmountPackage({
  currency,
  ...props
}: AmountPackageProps) {
  console.log(props);
  return (
    <Container>
      <p>{currency}</p>
    </Container>
  );
}

import * as React from 'react';
import styled from 'react-emotion';

const Name = styled('div')`
  font-size: 16px;
  font-weight: 500;
`;

const Price = styled('div')`
  font-size: 12px;
  color: #777777;
  font-weight: 500;
`;

interface AmountPackageProps {
  name: any;
  price: any;
}

export default function AmountPackage({ name, price }: AmountPackageProps) {
  return (
    <div>
      <Name>{name}</Name>
      <Price>{price}</Price>
    </div>
  );
}

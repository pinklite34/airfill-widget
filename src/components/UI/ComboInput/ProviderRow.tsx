import * as React from 'react';
import styled from 'react-emotion';
import Row from './Row';

const Icon = styled('img')`
  max-width: 24px;
  max-height: 18px;
  display: block;
`;

export default function ProviderRow({ item, ...props }: any) {
  return (
    <Row
      {...props}
      icon={<Icon src={item.logoImage} alt={item.name} />}
      content={item.name}
    />
  );
}

import * as React from 'react';
import styled from 'react-emotion';

import * as defaultFlag from '../../unknown-flag.png';

const Img = styled('img')`
  margin: -3px 0;
  max-width: ${(p: any) => p.maxWidth || '24px'};
  max-height: ${(p: any) => p.maxHeight || '24px'};
`;

interface FlagProps {
  country: string;
  width?: string;
  height?: string;
}

export default function Flag({ country, width, height }: FlagProps) {
  let flag;

  try {
    flag = require('flag-icons/flags/flags-iso/flat/24/' + country + '.png');
  } catch (ex) {}

  return (
    <Img
      src={flag || defaultFlag}
      alt={country}
      maxWidth={width}
      maxHeight={height}
    />
  );
}

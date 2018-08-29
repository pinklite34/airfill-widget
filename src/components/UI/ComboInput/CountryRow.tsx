import * as React from 'react';

import { Country } from '../../../types';
import Flag from '../Flag';
import Row from './Row';

interface CountryRowProps {
  item: Country;
}

export default function CountryRow({ item, ...props }: CountryRowProps) {
  return (
    <Row {...props} icon={<Flag country={item.alpha2} />} content={item.name} />
  );
}

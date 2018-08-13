import * as React from 'react';

import Row from './Row';
import Flag from '../Flag';
import { countryProp, rowProps } from '../../../lib/prop-types';

export default function CountryRow({ item, ...props }) {
  return (
    <Row {...props} icon={<Flag country={item.alpha2} />} content={item.name} />
  );
}

/* CountryRow.propTypes = {
  item: countryProp,
  ...rowProps,
};
 */
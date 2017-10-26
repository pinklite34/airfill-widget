import React from 'react';
import Row from './Row';
import flags from '../../flags';

const CountryRow = ({ item, ...props }) => {
  const Flag = flags[item.alpha2.toLowerCase()];

  return (
    <Row
      {...props}
      icon={Flag ? <Flag width={24} height={18} /> : null}
      content={item.name}
    />
  );
};

export default CountryRow;

import React from 'react';
import { css } from 'glamor';
import Row from './Row';

const styles = {
  icon: css({
    maxWidth: 24,
    maxHeight: 18,
    display: 'block'
  })
};

const ProviderRow = ({ item, ...props }) => {
  return (
    <Row
      {...props}
      icon={<img src={item.logoImage} alt={item.name} {...styles.icon} />}
      content={item.name}
    />
  );
};

export default ProviderRow;

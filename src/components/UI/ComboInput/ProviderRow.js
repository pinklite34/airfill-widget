import React from 'react';
import { css } from 'glamor';
import Row from './Row';
import { operatorProp, rowProps } from '../../../lib/prop-types';

const styles = {
  icon: css({
    maxWidth: 24,
    maxHeight: 18,
    display: 'block',
  }),
};

export default function ProviderRow({ item, ...props }) {
  return (
    <Row
      {...props}
      icon={<img src={item.logoImage} alt={item.name} {...styles.icon} />}
      content={item.name}
    />
  );
}

ProviderRow.propTypes = {
  item: operatorProp,
  ...rowProps,
};

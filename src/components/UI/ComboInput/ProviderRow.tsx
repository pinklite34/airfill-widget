import React from 'react';
import { css } from 'react-emotion';
import Row from './Row';
import { operatorProp, rowProps } from '../../../lib/prop-types';

const styles = {
  icon: css`
    max-width: 24px;
    max-height: 18px;
    display: block;
  `,
};

export default function ProviderRow({ item, ...props }) {
  return (
    <Row
      {...props}
      icon={
        <img src={item.logoImage} alt={item.name} className={styles.icon} />
      }
      content={item.name}
    />
  );
}

ProviderRow.propTypes = {
  item: operatorProp,
  ...rowProps,
};

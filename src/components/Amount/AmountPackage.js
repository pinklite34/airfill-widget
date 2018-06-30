import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const styles = {
  name: css`
    font-size: 16px;
    font-weight: 500;
  `,
  price: css`
    font-size: 12px;
    color: #777777;
    font-weight: 500;
  `,
};

export default function AmountPackage({ name, price }) {
  return (
    <div>
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{price}</div>
    </div>
  );
}

AmountPackage.propTypes = {
  name: PropTypes.node,
  price: PropTypes.node,
};

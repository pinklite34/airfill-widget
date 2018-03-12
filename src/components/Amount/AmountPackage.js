import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const styles = {
  name: css({
    fontSize: 16,
    fontWeight: 500,
  }),
  price: css({
    fontSize: 12,
    color: '#777777',
    fontWeight: 500,
  }),
};

export default function AmountPackage({ name, price }) {
  return (
    <div>
      <div {...styles.name} className="package-value">
        {name}
      </div>
      <div {...styles.price}>{price}</div>
    </div>
  );
}

AmountPackage.propTypes = {
  name: PropTypes.node,
  price: PropTypes.node,
};

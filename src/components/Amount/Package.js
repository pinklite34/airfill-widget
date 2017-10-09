import React from 'react';
import { css } from 'glamor';

const styles = {
  name: css({
    fontSize: 16,
    fontWeight: 500
  }),
  price: css({
    fontSize: 12,
    color: '#777777',
    fontWeight: 500
  })
};

const Package = ({ name, price }) => (
  <div>
    <div {...styles.name} className="package-value">{name}</div>
    <div {...styles.price}>{price}</div>
  </div>
);

export default Package;

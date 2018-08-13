import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Name = styled('div')`
  font-size: 16px;
  font-weight: 500;
`;

const Price = styled('div')`
  font-size: 12px;
  color: #777777;
  font-weight: 500;
`;

export default function AmountPackage({ name, price }) {
  return (
    <div>
      <Name>{name}</Name>
      <Price>{price}</Price>
    </div>
  );
}

AmountPackage.propTypes = {
  name: PropTypes.node,
  price: PropTypes.node,
};

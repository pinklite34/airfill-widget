import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Address = styled('span')`
  border: 1px solid rgba(0, 0, 0, 0.16);
  background-color: #fff;
  font-weight: normal;
  border-radius: 2px;
  padding: 8px;
  font-size: 16px;
`;

export default function BitcoinAddress({ address, ...props }) {
  return (
    <Address {...props} size="44">
      {address}
    </Address>
  );
}

BitcoinAddress.propTypes = {
  address: PropTypes.string,
};

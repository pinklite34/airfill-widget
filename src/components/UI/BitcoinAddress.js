import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Address = styled('div')`
  border: 1px solid rgba(0, 0, 0, 0.16);
  background-color: #fafafa;
  font-weight: normal;
  border-radius: 2px;
  padding: ${p => p.padding || '8px'};
  font-size: ${p => p.size || '16px'};
  width: ${p => p.width};
  line-height: 1;
`;

export default function BitcoinAddress({ address, ...props }) {
  return <Address {...props}>{address}</Address>;
}

BitcoinAddress.propTypes = {
  address: PropTypes.string,
};

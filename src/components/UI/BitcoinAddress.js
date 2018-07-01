import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { css } from 'react-emotion';

const style = css`
  border: 1px solid rgba(0, 0, 0, 0.16);
  background-color: #fff;
  font-weight: normal;
  border-radius: 2px;
  padding: 8px;
  font-size: 16px;
`;

export default function BitcoinAddress({ address, ...props }) {
  return (
    <TextField
      {...props}
      fullWidth
      className={style}
      type="text"
      readOnly
      value={address}
      size="44"
    />
  );
}

BitcoinAddress.propTypes = {
  address: PropTypes.string,
};

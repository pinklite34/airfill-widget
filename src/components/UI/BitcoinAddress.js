import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { css } from 'glamor';

const style = css({
  border: '1px solid rgba(0,0,0,0.16)',
  backgroundColor: '#fff',
  fontWeight: 'normal',
  borderRadius: 2,
  padding: 8,
  fontSize: 16,
});

export default function BitcoinAddress({ address, ...props }) {
  return (
    <TextField
      {...props}
      fullWidth
      {...style}
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

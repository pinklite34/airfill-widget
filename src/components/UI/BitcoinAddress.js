import React from 'react';
import { css } from 'glamor';

const style = css({
  border: '1px solid rgba(0,0,0,0.16)',
  backgroundColor: '#fff',
  borderRadius: 2,
  padding: 8,
  fontSize: 16
});

const BitcoinAddress = ({ address }) => (
  <input {...style} type="text" readOnly={true} value={address} size="44" />
);

export default BitcoinAddress;

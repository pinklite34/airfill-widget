import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import defaultFlag from '../../unknown-flag.png';

const Img = styled('img')`
  margin: -3px 0;
  max-width: ${p => p.maxWidth || '24px'};
  max-height: ${p => p.maxHeight || '24px'};
`;

export default function Flag({ country, width, height }) {
  let flag;

  try {
    flag = require('flag-icons/flags/flags-iso/flat/24/' + country + '.png');
  } catch (ex) {}

  return (
    <Img
      src={flag || defaultFlag}
      alt={country}
      maxWidth={width}
      maxHeight={height}
    />
  );
}

Flag.propTypes = {
  country: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import defaultFlag from '../../unknown-flag.png';

const styles = {
  image: css({
    margin: '-3px 0',
    width: 24,
    height: 24,
  }),
};

const Flag = ({ country }) => {
  let flag;

  try {
    flag = require('flag-icons/flags/flags-iso/flat/24/' + country + '.png');
  } catch (ex) {}

  return <img src={flag || defaultFlag} alt={country} {...styles.image} />;
};

Flag.propTypes = {
  country: PropTypes.string,
};

export default Flag;

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import flags from './flags';

import defaultFlag from '../../unknown-flag.png';

const styles = {
  image: css({
    margin: '-3px 0',
    width: 24,
    height: 24,
  }),
};

const Flag = ({ country }) => (
  <img src={flags[country] || defaultFlag} alt={country} {...styles.image} />
);

Flag.propTypes = {
  country: PropTypes.string,
};

export default Flag;

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import defaultFlag from 'flag-icons/flags/flags-iso/flat/24/_unknown.png';

import flags from '../flags';

const styles = {
  image: css({
    margin: '-3px 0',
    width: 24,
    height: 24,
  }),
};

export default function Flag({ country }) {
  return (
    <img
      src={(country && flags[country]) || defaultFlag}
      alt={country}
      {...styles.image}
    />
  );
}

Flag.propTypes = {
  country: PropTypes.string,
};

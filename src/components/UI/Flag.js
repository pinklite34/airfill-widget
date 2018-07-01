import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import flags from './flags';

import defaultFlag from '../../unknown-flag.png';

const styles = {
  image: css`
    margin: -3px 0;
    width: 24px;
    height: 24px;
  `,
};

export default function Flag({ country }) {
  return (
    <img
      src={flags[country] || defaultFlag}
      alt={country}
      className={styles.image}
    />
  );
}

Flag.propTypes = {
  country: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

import defaultFlag from '../../unknown-flag.png';

const style = css`
  margin: -3px 0;
  width: 24px;
  height: 24px;
`;

const Flag = ({ country }) => {
  let flag;

  try {
    flag = require('flag-icons/flags/flags-iso/flat/24/' + country + '.png');
  } catch (ex) {}

  return <img src={flag || defaultFlag} alt={country} className={style} />;
};

Flag.propTypes = {
  country: PropTypes.string,
};

export default Flag;

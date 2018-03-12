import React from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import BitrefillLogo from './logo.svg';
import { fnProp } from '../../lib/prop-types';

const styles = {
  logo: css({
    cursor: 'pointer',
    '& + div': {
      marginTop: 16,
    },
  }),
};

function HeaderLogo({ goHome }) {
  return (
    <BitrefillLogo fill="#fff" width="104" {...styles.logo} onClick={goHome} />
  );
}

HeaderLogo.propTypes = {
  goHome: fnProp,
};

export default connect(null, dispatch => ({
  goHome: () => dispatch(push('/refill')),
}))(HeaderLogo);

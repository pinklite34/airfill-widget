import React from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import BitrefillLogo from './logo.svg';

const styles = {
  logo: css({
    cursor: 'pointer',
    '& + div': {
      marginTop: 16
    }
  })
};

const Logo = ({ goHome }) => (
  <BitrefillLogo fill="#fff" width="104" {...styles.logo} onClick={goHome} />
);

export default connect(null, dispatch => ({
  goHome: () => dispatch(push('/refill'))
}))(Logo);

import * as React from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import BitrefillLogo from './logo.svg';

const styles = {
  logo: css`
    cursor: pointer;

    & + div {
      margin-top: 16px;
    }
  `,
};

function HeaderLogo({ goHome }: { goHome: () => void }) {
  return (
    <BitrefillLogo
      fill="#fff"
      width="114"
      className={styles.logo}
      onClick={goHome}
    />
  );
}

export default connect(
  null,
  dispatch => ({
    goHome: () => dispatch(push('/refill')),
  })
)(HeaderLogo);

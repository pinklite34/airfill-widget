import React from 'react';
import { Route } from 'react-router';
import { css } from 'glamor';

import Introduction from './Introduction';

import Logo from './logo.svg';

const styles = {
  container: css({
    background: '#3e8fe4',
    borderRadius: 0,
    padding: 24,
    textAlign: 'center',
    color: '#ffffff',
    zIndex: 10,
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.16)',
    position: 'relative'
  }),
  logo: css({
    cursor: 'pointer',
    marginBottom: 20
  })
};

const Header = ({ branded }) => (
  <div {...styles.container}>
    {branded && <Route
      render={({ history }) => (
        <Logo
          fill="#fff"
          width="104"
          {...styles.logo}
          onClick={() => history.push('/')}
        />
      )}
    />}
    <Route path="/" render={props => <Introduction branded={branded} {...props} />} exact />
  </div>
);

export default Header;

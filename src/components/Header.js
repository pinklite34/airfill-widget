import React from 'react';
import { Switch, Route } from 'react-router';
import { css } from 'glamor';

import Introduction from './Introduction';

import BitrefillLogo from './logo.svg';

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
    '& + div': {
      marginTop: 20
    }
  })
};

const Logo = () => (
  <Route
    render={({ history }) => (
      <BitrefillLogo
        fill="#fff"
        width="104"
        {...styles.logo}
        onClick={() => history.push('/')}
      />
    )}
  />
);

const Header = ({ branded }) => (
  <Switch>
    <Route
      path="/"
      exact
      render={props => (
        <div {...styles.container}>
          {branded && <Logo />}
          <Introduction branded={branded} {...props} />
        </div>
      )}
    />
    <Route
      render={props =>
        branded && (
          <div {...styles.container}>
            <Logo />
          </div>
        )}
    />
  </Switch>
);

export default Header;

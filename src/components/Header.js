import React from 'react';
import { Route } from 'react-router';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';

import Introduction from './Introduction';

import Logo from './logo.svg';

const container = css({
  background: '#3e8fe4',
  borderRadius: 0,
  padding: 24,
  textAlign: 'center',
  color: '#ffffff',
  zIndex: 10,
  boxShadow: '0 1px 2px 0 rgba(0,0,0,.16)'
})

const Header = ({ branded }) => (
  <div {...container}>
    <Logo fill="#fff" width="104" />
    <Route
      path="/"
      render={() => <Introduction branded={branded} />}
      exact
    />
  </div>
);

export default Header;

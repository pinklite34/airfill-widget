import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import styled from 'react-emotion';

import HeaderLogo from './HeaderLogo';
import HeaderIntroduction from './HeaderIntroduction';

const Container = styled('div')`
  background: #3e8fe4;
  border-radius: 0px;
  padding: 24px;
  text-align: center;
  color: #ffffff;
  z-index: 10;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  position: relative;

  @media (max-width: ${p => p.theme.bp.mobile}) {
    & {
      padding: 12px;
    }
  }
`;

export default function Header({ branded, isMobile }) {
  return (
    <Switch>
      <Route
        path="/refill"
        exact
        render={props => (
          <Container>
            {branded && <HeaderLogo />}
            <HeaderIntroduction
              isMobile={isMobile}
              branded={branded}
              {...props}
            />
          </Container>
        )}
      />
      <Route
        render={() =>
          branded && (
            <Container>
              <HeaderLogo />
            </Container>
          )
        }
      />
    </Switch>
  );
}

Header.propTypes = {
  branded: PropTypes.bool,
  isMobile: PropTypes.bool,
};

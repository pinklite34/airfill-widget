import * as React from 'react';
import styled from 'react-emotion';
import { Route, Switch } from 'react-router';

import { Config } from '../../types';
import HeaderIntroduction from './HeaderIntroduction';
import HeaderLogo from './HeaderLogo';

const Container = styled('div')`
  background: #3e8fe4;
  border-radius: 0px;
  padding: 24px;
  text-align: center;
  color: #ffffff;
  z-index: 10;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  position: relative;

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    & {
      padding: 12px;
    }
  }
`;

interface HeaderProps {
  branded: boolean;
  isMobile: boolean;
  config: Config;
}

export default function Header({ branded, isMobile, config }: HeaderProps) {
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
              config={config}
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

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { css } from 'react-emotion';

import HeaderLogo from './HeaderLogo';
import HeaderIntroduction from './HeaderIntroduction';

const styles = {
  container: css`
    background: #3e8fe4;
    border-radius: 0px;
    padding: 24px;
    text-align: center;
    color: #ffffff;
    z-index: 10;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
    position: relative;

    @media (max-width: 400px) {
      & {
        padding: 12px;
      }
    }
  `,
};

export default function Header({ branded, isMobile }) {
  return (
    <Switch>
      <Route
        path="/refill"
        exact
        render={props => (
          <div className={styles.container}>
            {branded && <HeaderLogo />}
            <HeaderIntroduction
              isMobile={isMobile}
              branded={branded}
              {...props}
            />
          </div>
        )}
      />
      <Route
        render={props =>
          branded && (
            <div className={styles.container}>
              <HeaderLogo />
            </div>
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

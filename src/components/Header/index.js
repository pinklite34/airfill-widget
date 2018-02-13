import React from 'react'
import { Switch, Route } from 'react-router'
import { css } from 'glamor'

import Logo from './Logo'
import Introduction from './Introduction'

const styles = {
  container: css({
    background: '#3e8fe4',
    borderRadius: 0,
    padding: 24,
    textAlign: 'center',
    color: '#ffffff',
    zIndex: 10,
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.16)',
    position: 'relative',
    '@media(max-width: 400px)': {
      '&': {
        padding: 12,
      },
    },
  }),
}

const Header = ({ branded }) => (
  <Switch>
    <Route
      path="/refill"
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
        )
      }
    />
  </Switch>
)

export default Header

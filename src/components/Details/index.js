import React from 'react'
import { Switch, Route } from 'react-router'

import TopupDetails from './TopupDetails'

const Details = ({ config }) => (
  <Switch>
    <Route path="/refill" exact />
    <Route path="/refill/selectProvider" />
    <Route
      path="/refill/selectAmount"
      render={props => <TopupDetails config={config} {...props} />}
    />
  </Switch>
)

export default Details

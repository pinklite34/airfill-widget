import React from 'react'
import { Switch, Route } from 'react-router'
import Collapsed from './Collapsed'

const Number = () => (
  <Switch>
    <Route path="/refill" exact />
    <Route path="/refill/selectProvider" component={Collapsed} />
    <Route
      path="/refill/selectAmount"
      render={props => <Collapsed darken={1} {...props} />}
    />
    <Route render={props => <Collapsed darken={2} {...props} />} />
  </Switch>
)

export default Number

import React from 'react'
import { Switch, Route } from 'react-router'
import Payment from './Payment'

const Order = ({ config }) => (
  <Switch>
    <Route path="/refill" exact />
    <Route path="/refill/selectProvider" />
    <Route path="/refill/selectAmount" />
    <Route
      path="/refill/payment"
      render={props => <Payment {...props} {...config} />}
    />
  </Switch>
)

export default Order

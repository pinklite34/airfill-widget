import React from 'react';
import { Switch, Route } from 'react-router';
import Payment from './Payment';

const Order = ({ config }) => (
  <Switch>
    <Route path="/" exact />
    <Route path="/selectProvider" />
    <Route path="/selectAmount" />
    <Route
      path="/payment"
      render={props => <Payment {...props} {...config} />}
    />
  </Switch>
);

export default Order;

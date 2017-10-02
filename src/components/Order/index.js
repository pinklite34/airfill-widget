import React from 'react';
import { Switch, Route } from 'react-router';
import Payment from './Payment';

const Order = () => (
  <Switch>
    <Route path="/" exact />
    <Route path="/selectProvider" />
    <Route path="/selectAmount" />
    <Route path="/payment" component={Payment} />
  </Switch>
);

export default Order;

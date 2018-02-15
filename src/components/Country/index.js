import React from 'react';
import { Switch, Route } from 'react-router';
import Collapsed from './Collapsed';

const Country = () => (
  <Switch>
    <Route
      path="/refill"
      exact
      render={props => <Collapsed home {...props} />}
    />
    <Route path="/refill/selectProvider" component={Collapsed} />
    <Route
      path="/refill/selectAmount"
      render={props => <Collapsed darken={1} {...props} />}
    />
    <Route render={props => <Collapsed darken={2} {...props} />} />
  </Switch>
);

export default Country;

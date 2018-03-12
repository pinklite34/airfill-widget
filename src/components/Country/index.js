import React from 'react';
import { Switch, Route } from 'react-router';
import CountryCollapsed from './CountryCollapsed';

export default function CountryRoutes() {
  return (
    <Switch>
      <Route
        path="/refill"
        exact
        render={props => <CountryCollapsed home {...props} />}
      />
      <Route path="/refill/selectProvider" component={CountryCollapsed} />
      <Route
        path="/refill/selectAmount"
        render={props => <CountryCollapsed darken={1} {...props} />}
      />
      <Route render={props => <CountryCollapsed darken={2} {...props} />} />
    </Switch>
  );
}

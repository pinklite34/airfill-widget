import * as React from 'react';
import { Route, Switch } from 'react-router';
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
        render={props => <CountryCollapsed {...props} />}
      />
      <Route render={props => <CountryCollapsed {...props} />} />
    </Switch>
  );
}

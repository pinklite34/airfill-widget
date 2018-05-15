import React from 'react';
import { Switch, Route } from 'react-router';
import NumberLookupCollapsed from './NumberLookupCollapsed';

export default function NumberLookupRoutes() {
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" component={NumberLookupCollapsed} />
      <Route
        path="/refill/selectAmount"
        render={props => <NumberLookupCollapsed {...props} />}
      />
      <Route render={props => <NumberLookupCollapsed {...props} />} />
    </Switch>
  );
}

import React from 'react';
import { Switch, Route } from 'react-router';
import ProviderCollapsed from './ProviderCollapsed';
import ProviderPicker from './ProviderPicker';

export default function Providers() {
  return (
    <Switch>
      <Route path="/refill" exact component={ProviderPicker} />
      <Route path="/refill/selectProvider" component={ProviderPicker} />
      <Route path="/refill/selectAmount" component={ProviderCollapsed} />
      <Route render={props => <ProviderCollapsed {...props} />} />
    </Switch>
  );
}

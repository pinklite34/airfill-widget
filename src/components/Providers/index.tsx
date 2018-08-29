import * as React from 'react';
import { Route, Switch } from 'react-router';
import ProviderCollapsed from './ProviderCollapsed';
import ProviderPickerAsync from './ProviderPickerAsync';

export default function Providers() {
  return (
    <Switch>
      <Route path="/refill" exact component={ProviderPickerAsync} />
      <Route path="/refill/selectProvider" component={ProviderPickerAsync} />
      <Route path="/refill/selectAmount" component={ProviderCollapsed} />
      <Route render={props => <ProviderCollapsed {...props} />} />
    </Switch>
  );
}

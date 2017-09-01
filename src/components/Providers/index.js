import React from 'react';
import { Switch, Route } from 'react-router';
import Collapsed from './Collapsed';
import ProviderGrid from './ProviderGrid';

const Providers = () => (
  <Switch>
    <Route path="/" exact component={ProviderGrid} />
    <Route path="/selectProvider" component={ProviderGrid} />
    <Route component={Collapsed} />
  </Switch>
);

export default Providers;

import React from 'react';
import { Switch, Route } from 'react-router';
import Collapsed from './Collapsed';
import ProviderGrid from './ProviderGrid';

const Providers = () => (
  <Switch>
    <Route path="/" exact component={ProviderGrid} />
    <Route path="/selectProvider" component={ProviderGrid} />
    <Route path="/selectAmount" component={Collapsed} />
    <Route render={props => <Collapsed darken={1} {...props} />} />
  </Switch>
);

export default Providers;

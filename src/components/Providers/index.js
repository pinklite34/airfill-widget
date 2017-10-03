import React from 'react';
import { Switch, Route } from 'react-router';
import Collapsed from './Collapsed';
import Picker from './Picker';

const Providers = () => (
  <Switch>
    <Route path="/" exact component={Picker} />
    <Route path="/selectProvider" component={Picker} />
    <Route path="/selectAmount" component={Collapsed} />
    <Route render={props => <Collapsed darken={1} {...props} />} />
  </Switch>
);

export default Providers;

import React from 'react';
import { Switch, Route } from 'react-router';
import Collapsed from './Collapsed';

const Country = () => (
  <Switch>
    <Route path="/" exact render={props => <Collapsed home {...props} />} />
    <Route path="/selectProvider" component={Collapsed} />
    <Route path="/selectAmount" render={props => <Collapsed darken={1} {...props} />} />
    <Route render={props => <Collapsed darken={2} {...props} />} />
  </Switch>
);

export default Country;

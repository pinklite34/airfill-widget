import React from 'react';
import { Switch, Route } from 'react-router';
import Collapsed from './Collapsed';

const Country = () => (
  <Switch>
    <Route path="/" exact render={() => <Collapsed prefix="Services in" />} />
    <Route component={Collapsed} />
  </Switch>
);

export default Country;

import React from 'react';
import { Switch, Route } from 'react-router';

import Collapsed from './Collapsed';
import PackageGrid from './PackageGrid';

const Amounts = () =>
  <Switch>
    <Route path="/" exact />
    <Route path="/selectProvider" />
    <Route path="/selectAmount" component={PackageGrid} />
    <Route component={Collapsed} />
  </Switch>

export default Amounts;

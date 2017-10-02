import React from 'react';
import { Switch, Route } from 'react-router';

import Collapsed from './Collapsed';
import Picker from './Picker';

const Amounts = ({ config }) => (
  <Switch>
    <Route path="/" exact />
    <Route path="/selectProvider" />
    <Route
      path="/selectAmount"
      render={props => <Picker config={config} {...props} />}
    />
    <Route component={Collapsed} />
  </Switch>
);

export default Amounts;

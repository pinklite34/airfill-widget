import React from 'react';
import { Switch, Route } from 'react-router';

import TopupDetails from './TopupDetails';

const Details = ({ config }) => (
  <Switch>
    <Route path="/" exact />
    <Route path="/selectProvider" />
    <Route
      path="/selectAmount"
      render={props => <TopupDetails config={config} {...props} />}
    />
  </Switch>
);

export default Details;

import React from 'react';
import { Switch, Route } from 'react-router';

import { configProp } from '../../lib/prop-types';

import DetailsTopup from './DetailsTopup';

export default function DetailsRoutes({ config }) {
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route
        path="/refill/selectAmount"
        render={props => <DetailsTopup config={config} {...props} />}
      />
    </Switch>
  );
}

DetailsRoutes.propTypes = {
  config: configProp,
};

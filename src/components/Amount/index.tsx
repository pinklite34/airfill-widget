import React from 'react';
import { Switch, Route } from 'react-router';

import { configProp } from '../../lib/prop-types';

import AmountCollapsed from './AmountCollapsed';
import AmountPicker from './AmountPicker';

export default function AmountRoutes({ config }) {
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route
        path="/refill/selectAmount"
        render={props => <AmountPicker config={config} {...props} />}
      />
      <Route component={AmountCollapsed} />
    </Switch>
  );
}

AmountRoutes.propTypes = {
  config: configProp,
};

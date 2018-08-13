import * as React from 'react';
import { Route, Switch } from 'react-router';

import { Config } from '../../lib/prop-types';
import AmountCollapsed from './AmountCollapsed';
import AmountPicker from './AmountPicker';

export default function AmountRoutes({ config }: { config: Config }) {
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

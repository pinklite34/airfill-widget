import * as React from 'react';
import { Route, Switch } from 'react-router';

import { Config } from '../../types';
import AmountCollapsed from './AmountCollapsed';
import AmountPickerAsync from './AmountPickerAsync';

export default function AmountRoutes({ config }: { config: Config }) {
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route
        path="/refill/selectAmount"
        render={props => <AmountPickerAsync config={config} {...props} />}
      />
      <Route component={AmountCollapsed} />
    </Switch>
  );
}

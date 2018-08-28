import * as React from 'react';
import { Route, Switch } from 'react-router';

import { Config } from '../../types';
import PaymentCollapsed from './PaymentCollapsed';
import PaymentPicker from './PaymentPicker';

export default function PaymentMethod({ config }: { config: Config }) {
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route path="/refill/selectAmount" />
      <Route path="/refill/selectStatusEmail" />
      <Route path="/refill/selectRecipient" />
      <Route
        path="/refill/selectPayment"
        render={props => <PaymentPicker {...props} config={config} />}
      />
      <Route component={PaymentCollapsed} />
    </Switch>
  );
}

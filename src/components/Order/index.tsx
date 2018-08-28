import * as React from 'react';
import { Route, Switch } from 'react-router';

import { Config } from '../../types';
import Payment from './Payment';

export default function Order({ config }: { config: Config }) {
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route path="/refill/selectAmount" />
      <Route path="/refill/selectRecipient" />
      <Route path="/refill/selectPayment" />
      <Route
        path="/refill/payment"
        render={props => <Payment {...props} {...config} />}
      />
    </Switch>
  );
}

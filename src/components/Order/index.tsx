import * as React from 'react';
import { Switch, Route } from 'react-router';

import Payment from './Payment';
import { configProp } from '../../lib/prop-types';

export default function Order({ config }) {
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

/* Order.propTypes = {
  config: configProp,
}; */

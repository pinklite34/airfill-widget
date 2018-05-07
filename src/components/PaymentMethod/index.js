import React from 'react';
import { Switch, Route } from 'react-router';
import PaymentCollapsed from './PaymentCollapsed';
import PaymentMethodPicker from './PaymentMethod';
import { configProp } from '../../lib/prop-types';

export default function PaymentMethod({ config }) {
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route path="/refill/selectAmount" />
      <Route path="/refill/selectReceipent" />
      <Route
        path="/refill/selectPayment"
        render={props => <PaymentMethodPicker {...props} {...config} />}
      />
      <Route component={PaymentCollapsed} />
    </Switch>
  );
}

PaymentMethod.propTypes = {
  config: configProp,
};

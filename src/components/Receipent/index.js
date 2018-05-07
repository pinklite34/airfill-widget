import React from 'react';
import { Switch, Route } from 'react-router';
import ReceipentCollapsed from './ReceipentCollapsed';
import ReceipentPicker from './Receipent';
import { configProp } from '../../lib/prop-types';

export default function Receipent({ config }) {
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route path="/refill/selectAmount" />
      <Route
        path="/refill/selectReceipent"
        render={props => <ReceipentPicker {...props} config={config} />}
      />
      <Route component={ReceipentCollapsed} />
    </Switch>
  );
}

Receipent.propTypes = {
  config: configProp,
};

import React from 'react';
import { Switch, Route } from 'react-router';
import ProviderCollapsed from './ProviderCollapsed';
import ProviderPicker from './ProviderPicker';
import { configProp } from '../../lib/prop-types';

export default function Providers({ config }) {
  return (
    <Switch>
      <Route
        path="/refill"
        exact
        render={props => <ProviderPicker {...props} config={config} />}
      />
      <Route
        path="/refill/selectProvider"
        render={props => <ProviderPicker {...props} config={config} />}
      />
      <Route path="/refill/selectAmount" component={ProviderCollapsed} />
      <Route render={props => <ProviderCollapsed darken={1} {...props} />} />
    </Switch>
  );
}

Providers.propTypes = {
  config: configProp,
};

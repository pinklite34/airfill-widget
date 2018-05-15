import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

import ReceipentCollapsed from './ReceipentCollapsed';
import ReceipentPicker from './Receipent';
import { configProp, operatorProp } from '../../lib/prop-types';

import { isValidEmail } from '../../lib/email-validation';
import { selectOperator } from '../../store';

function Receipent({ config, operator }) {
  const showEmail = !isValidEmail(config.orderOptions.email);
  const showNumber = !operator.result || !operator.result.noNumber;

  const show = showEmail || showNumber;
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route path="/refill/selectAmount" />
      <Route
        path="/refill/selectReceipent"
        render={props => <ReceipentPicker {...props} config={config} />}
      />
      {show && <Route component={ReceipentCollapsed} />}
    </Switch>
  );
}

Receipent.propTypes = {
  config: configProp,
  operator: operatorProp,
};

export default connect(state => ({ operator: selectOperator(state) }))(
  Receipent
);

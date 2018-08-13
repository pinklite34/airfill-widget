import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

import RecipientCollapsed from './StatusEmailCollapsed';
import RecipientPicker from './StatusEmail';
import { configProp, operatorProp } from '../../lib/prop-types';

import { selectOperator } from '../../store';
import { isValidEmail } from '../../lib/email-validation';

function StatusEmail({ config, operator }) {
  const show = !isValidEmail(config.orderOptions.email);

  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route path="/refill/selectAmount" />
      <Route path="/refill/selectRecipient" />
      <Route
        path="/refill/selectStatusEmail"
        render={props => <RecipientPicker {...props} config={config} />}
      />
      {show && <Route component={RecipientCollapsed} />}
    </Switch>
  );
}

StatusEmail.propTypes = {
  config: configProp,
  operator: operatorProp,
};

export default connect(state => ({ operator: selectOperator(state) }))(
  StatusEmail
);

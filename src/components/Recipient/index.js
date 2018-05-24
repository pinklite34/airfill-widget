import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';

import RecipientCollapsed from './RecipientCollapsed';
import RecipientPicker from './Recipient';
import { configProp, operatorProp } from '../../lib/prop-types';

import { isValidEmail } from '../../lib/email-validation';
import { selectOperator } from '../../store';

function Recipient({ config, operator }) {
  const showEmail = !isValidEmail(config.orderOptions.email);
  const showRecipient =
    operator.result && operator.result.recipientType !== 'none';

  const show = showEmail || showRecipient;
  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route path="/refill/selectAmount" />
      <Route
        path="/refill/selectRecipient"
        render={props => <RecipientPicker {...props} config={config} />}
      />
      {show && <Route component={RecipientCollapsed} />}
    </Switch>
  );
}

Recipient.propTypes = {
  config: configProp,
  operator: operatorProp,
};

export default connect(state => ({ operator: selectOperator(state) }))(
  Recipient
);

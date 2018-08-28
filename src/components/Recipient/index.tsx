import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import { Config, OperatorResult } from '../../types';
import { selectOperator } from '../../store';
import RecipientPicker from './Recipient';
import RecipientCollapsed from './RecipientCollapsed';

interface RecipientProps {
  config: Config;
  operator: OperatorResult;
}

function Recipient({ config, operator }: RecipientProps) {
  const show = operator.result && operator.result.recipientType !== 'none';

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

export default connect(state => ({ operator: selectOperator(state) }))(
  Recipient
);

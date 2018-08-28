import * as React from 'react';
import { Route, Switch } from 'react-router';

import { isValidEmail } from '../../lib/email-validation';
import { Config } from '../../types';
import RecipientPicker from './StatusEmail';
import RecipientCollapsed from './StatusEmailCollapsed';

interface StatusEmailProps {
  config: Config;
}

function StatusEmail({ config }: StatusEmailProps) {
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

export default StatusEmail;

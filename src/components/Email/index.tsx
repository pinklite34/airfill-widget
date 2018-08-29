import * as React from 'react';
import { Route, Switch } from 'react-router';

import { isValidEmail } from '../../lib/email-validation';
import { Config } from '../../types';
import EmailCollapsed from './EmailCollapsed';
import EmailPickerAsync from './EmailPickerAsync';

interface EmailProps {
  config: Config;
}

function Email({ config }: EmailProps) {
  const show = !isValidEmail(config.orderOptions.email);

  return (
    <Switch>
      <Route path="/refill" exact />
      <Route path="/refill/selectProvider" />
      <Route path="/refill/selectAmount" />
      <Route path="/refill/selectRecipient" />
      <Route
        path="/refill/selectEmail"
        render={props => <EmailPickerAsync {...props} config={config} />}
      />
      {show && <Route component={EmailCollapsed} />}
    </Switch>
  );
}

export default Email;

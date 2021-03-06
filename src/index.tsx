/* eslint-disable import/default */

import createHistory from 'history/createMemoryHistory';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from 'react-router-redux';

import initAnalytics from './lib/analytics-init';
import { client } from './lib/api-client';
import configureStore from './store/configureStore';

import Widget from './components/Widget';

export default Widget;

let store;

const history = createHistory();

function AirfillWidget(ele, opt) {
  const element = typeof ele === 'string' ? document.querySelector(ele) : ele;
  const options = {
    // Airfill Widget API key
    key: null,

    // Pass through order options
    refundAddress: '', // Used for automatic refunds if there is an error (only for bitcoin integrations)
    userEmail: '', // If set we won´t ask for the user email in step 3
    sendEmail: true, // Send email receipt (default: true)
    sendSMS: true, // Send SMS receipt, operator may send additional messages (default: true, only available for some operators)
    keepDefaultPayments: true, // Keep Bitrefill payment methods

    ...opt,
  };

  // Alias BTC -> XBT as we use XBT internally
  if (options.billingCurrency === 'BTC') {
    options.billingCurrency = 'XBT';
  }

  client.configure({
    token: options.key,
    baseUrl: options.baseUrl || 'https://api.bitrefill.com/widget',
  });

  const {
    billingCurrency,
    defaultNumber,
    userEmail: email,
    userAccountBalance,
    requireAccountBalance,
    keepDefaultPayments,
    sendEmail,
    sendSMS,
    refundAddress,
    paymentButtons,
    showBTCAddress,
    showLogo,
    showInstructions,
    forceOperator,
    coin,
  } = options;
  const orderOptions = { email, sendEmail, sendSMS, refundAddress };

  const middleware = routerMiddleware(history);

  store = store || configureStore(routerReducer, middleware);
  history.push('/refill');

  if (paymentButtons && !Array.isArray(paymentButtons)) {
    console.error('paymentButtons has to be an array');
  } else if (paymentButtons) {
    paymentButtons.forEach(element => (element.paymentMode = 'dashboard'));
  }

  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Widget
          className="refill-widget-root standalone"
          billingCurrency={billingCurrency}
          orderOptions={orderOptions}
          paymentButtons={paymentButtons}
          showBTCAddress={showBTCAddress}
          defaultNumber={defaultNumber}
          accountBalance={userAccountBalance}
          requireAccountBalance={requireAccountBalance}
          showInstructions={showInstructions}
          showLogo={showLogo}
          showPoweredBy={!showLogo}
          keepDefaultPayments={keepDefaultPayments}
          forceOperator={forceOperator}
          coin={coin}
        />
      </ConnectedRouter>
    </Provider>,
    element
  );

  setTimeout(initAnalytics, 0);
}

declare const window: any;
window.AirfillWidget = window.BitRefillWidget = AirfillWidget;

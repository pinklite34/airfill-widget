/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createMemoryHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

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
    operator,
    country,
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
      operator={operator}
      country={country}
    />,
    element
  );
}

window.AirfillWidget = window.BitRefillWidget = AirfillWidget;

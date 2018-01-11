/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';

import Widget from './components/Widget';
import { client } from './lib/api-client';
import configureStore from './store/configureStore';

import Pusher from 'pusher-js';
import { setPusherClient } from '@bitrefill/react-pusher';

// exports
import airfillWidget from './store';
import widgetStoreEnhancer from './store/enhanceStore';
import { client as restClient } from './lib/rest-helpers';

setPusherClient(new Pusher('0837b617cfe786c32a91', {
  encrypted: true
}));

let store;

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

    ...opt
  };

  // Alias BTC -> XBT as we use XBT internally
  if (options.billingCurrency === 'BTC') {
    options.billingCurrency = 'XBT';
  }

  client.configure({
    token: options.key,
    baseUrl: options.baseUrl || 'https://api.bitrefill.com/widget'
  });

  const {
    billingCurrency,
    defaultNumber,
    userEmail: email,
    userAccountBalance,
    requireAccountBalance,
    sendEmail,
    sendSMS,
    refundAddress,
    paymentButtons,
    showBTCAddress,
    showLogo,
    showInstructions
  } = options;
  const orderOptions = { email, sendEmail, sendSMS, refundAddress };

  const history = createHistory();
  const middleware = routerMiddleware(history);

  store = store || configureStore(routerReducer, middleware);
  history.push('/refill');

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
        />
      </ConnectedRouter>
    </Provider>,
    element
  );
}

window.AirfillWidget = window.BitRefillWidget = AirfillWidget;

export {
  airfillWidget,
  widgetStoreEnhancer,
  restClient
}

export default Widget;

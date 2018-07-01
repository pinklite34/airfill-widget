/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import createHistory from 'history/createMemoryHistory';
import { I18nextProvider } from 'react-i18next';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';

import i18n from './lib/i18n';
import { client } from './lib/api-client';
import configureStore from './store/configureStore';
import theme from './theme';

import Widget from './components/Widget';

// global module exports
import widgetStoreEnhancer from './store/enhanceStore';
import airfillWidget from './store';

import { init } from './actions';

/**
 * Helper action to initialize widget before being rendered
 */
export const initializeWidget = apiKey => (dispatch, getState) => {
  client.configure({
    token: apiKey || '5GY9TZBK8E05U9JQSTWFXNQS4',
    baseUrl: '/api/widget',
  });

  dispatch(init({}));
};

export { airfillWidget, widgetStoreEnhancer, client as restClient };

export { default as withWidget } from './components/withWidget';
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
    <I18nextProvider i18n={i18n}>
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
            operator={operator}
            country={country}
          />
        </ConnectedRouter>
      </Provider>
    </I18nextProvider>,
    element
  );
}

window.AirfillWidget = window.BitRefillWidget = AirfillWidget;

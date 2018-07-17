import { createAction } from 'redux-actions';
import { createLoadAction } from '../lib/rest-helpers';
import { fetch } from '../lib/api-client';
import { parse, format } from 'libphonenumber-js';

import {
  selectNumber,
  selectAmount,
  selectValidEmail,
  selectOrder,
  selectCountry,
  selectOperator,
  selectSubscribeNewsletter,
  selectPaymentMethod,
} from '../store';

import { history } from '../components/Widget';

export const setCountry = createAction('SET_COUNTRY');
export const setNumber = createAction('SET_NUMBER');
export const setPaymentMethod = createAction('SET_PAYMENT_METHOD');
export const setAmount = createAction('SET_AMOUNT');
export const trigger = createAction('UPDATE');
export const setEmail = createAction('SET_EMAIL');
export const setComboInputFocus = createAction('SET_COMBOINPUT_FOCUS');
export const updatePaymentStatus = createAction('UPDATE_PAYMENT_STATUS');
export const setSubscribeNewsletter = createAction('SET_SUBSCRIBE_NEWSLETTER');

const setComboInputOpen = createAction('SET_COMBOINPUT_OPEN');
export const openComboInput = () => setComboInputOpen(true);
export const closeComboInput = () => setComboInputOpen(false);

// add max width to all logoImage cloudinary URLs.
// We don't use more than 88 px wide in the widget atm so this will work for now
const transformInventory = inventory => {
  Object.keys(inventory)
    .map(key => inventory[key])
    .forEach(country =>
      Object.keys(country.operators)
        .map(key => country.operators[key])
        .forEach(operator => {
          operator.logoImage = operator.logoImage.replace(
            'd_operator.png',
            'd_operator.png,w_88,c_fit'
          );
        })
    );

  return inventory;
};

export const loadInventory = createLoadAction({
  name: 'airfillWidget.inventory',
  uri: '/inventory',
  responseTransform: transformInventory,
});

export const lookupLocation = () => (dispatch, getState) => {
  fetch('/lookup_country', {}).then(country => {
    if (country && !selectCountry(getState())) {
      dispatch(setCountry(country.toUpperCase()));
    }
  });
};

const processOperatorPackages = operator => {
  if (operator && operator.packages) {
    // Sort packages by price (asc)
    operator.packages.sort((a, b) => {
      if (a.satoshiPrice < b.satoshiPrice) return -1;
      if (a.satoshiPrice > b.satoshiPrice) return 1;
      return 0;
    });

    // Try to pick a subset of reasonable packages for ranged operators
    if (operator.isRanged) {
      operator.packages = [0, 0.2, 0.4, 0.6, 0.8, 1]
        .map(
          pos =>
            operator.packages[Math.round((operator.packages.length - 1) * pos)]
        )
        .reduce((mem, pack) => {
          if (!mem.length || mem[mem.length - 1] !== pack) {
            mem.push(pack);
          }
          return mem;
        }, []);
    }

    // Add BTC price for use in templates
    operator.packages.forEach(item => {
      item.btcPrice = Math.ceil(item.satoshiPrice / 100) / 1000000;
    });

    return operator;
  } else {
    return null;
  }
};

const transformOperatorResponse = response => {
  if (!response || !response.operator) {
    throw new Error('No operator response');
  }
  const operator = processOperatorPackages(response.operator);

  if (!operator) {
    throw response.message || 'Unknown error';
  } else {
    return operator;
  }
};

const loadOperator = createLoadAction({
  name: 'airfillWidget.operator',
  responseTransform: transformOperatorResponse,
});

export const setOperator = operatorSlug => (dispatch, getState) => {
  // prevent acccident if we do setOperator(operator)
  if (typeof operatorSlug === 'object') {
    operatorSlug = operatorSlug.slug;
  }

  dispatch(setAmount(''));
  return dispatch(
    loadOperator({ operatorSlug, uri: `/inventory/${operatorSlug}` })
  );
};

const transformNumberLookupReponse = response => {
  const { operator, altOperators, country } = response;
  return {
    operator: processOperatorPackages(operator),
    altOperators,
    country: country.alpha2,
  };
};

const loadNumberLookup = createLoadAction({
  name: 'airfillWidget.numberLookup',
  uri: '/lookup_number',
  responseTransform: transformNumberLookupReponse,
});

export const lookupNumber = number => dispatch => {
  const options = {
    query: { number },
  };

  dispatch(setAmount(''));
  return dispatch(loadNumberLookup(options));
};

export const resetNumberLookup = createAction('RESET_NUMBERLOOKUP');

const postOrder = createLoadAction({
  name: 'airfillWidget.order',
  uri: '/order',
});

export const createOrder = orderOptions => (dispatch, getState) => {
  const state = getState();
  const number = selectNumber(state);
  const amount = selectAmount(state);
  const email = selectValidEmail(state) || orderOptions.email;
  const operator = selectOperator(state);
  const order = selectOrder(state);
  const isSubscribing = selectSubscribeNewsletter(state);
  const method = selectPaymentMethod(state);

  const options = {
    body: {
      ...orderOptions,
      operatorSlug: operator.result.slug,
      valuePackage: amount,
      email,
      isSubscribing,
      paymentMethod: method.paymentMode,
    },
  };

  if (order.isLoading || operator.isLoading) {
    return Promise.reject() // eslint-disable-line
  }

  if (operator.result.recipientType !== 'none') {
    options.body.number = number;
  }

  return dispatch(postOrder(options));
};

const fetchOrder = createLoadAction('airfillWidget.order');
export const updateOrderStatus = () => (dispatch, getState) => {
  const order = selectOrder(getState());
  if (
    order &&
    order.result &&
    order.result.id &&
    order.result.payment &&
    order.result.payment.address
  ) {
    dispatch(
      fetchOrder({
        uri: `/order/${
          order.result.id
        }?incoming_btc_address=${encodeURIComponent(
          order.result.payment.address
        )}`,
        silent: true,
      })
    );
  }
};

const prefillNumber = number => (dispatch, getState) => {
  let parsedNumber;
  try {
    parsedNumber = number.indexOf('+') > -1 && parse(number);
  } catch (e) {}

  if (parsedNumber && parsedNumber.country) {
    // Set country and number
    dispatch(setCountry(parsedNumber.country));
    dispatch(setNumber(format(parsedNumber, 'International')));
  } else {
    // Set only number
    dispatch(setNumber(number));
  }
};

export const init = ({ defaultNumber, shouldLookupLocation = true } = {}) => (
  dispatch,
  getState
) => {
  const inventoryPromise = dispatch(loadInventory());
  dispatch(updateOrderStatus());

  const state = getState();

  const number = selectNumber(state);

  if (!number && defaultNumber) {
    // Try to auto detect country
    inventoryPromise.then(() => {
      dispatch(prefillNumber(defaultNumber));
    });
  } else if (shouldLookupLocation && !number) {
    dispatch(lookupLocation());
  }
};

export const useRecentRefill = recentRefill => dispatch => {
  dispatch(prefillNumber(recentRefill.number));
  if (recentRefill.operator) {
    dispatch(setOperator(recentRefill.operator));
    history.push('/refill/selectAmount');
  } else {
    dispatch(lookupNumber(recentRefill.number)).then(
      () => history.push('/refill/selectProvider'),
      () => history.push('/refill/selectAmount')
    );
  }
};

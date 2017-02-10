import {createAction} from 'redux-actions';
import {createLoadAction} from '../lib/rest-helpers';

export const setStep = createAction('SET_STEP');
export const setCountry = createAction('SET_COUNTRY');
export const setNumber = createAction('SET_NUMBER');
export const setAmount = createAction('SET_AMOUNT');
export const setEmail = createAction('SET_EMAIL');

export const updatePaymentStatus = createAction('UPDATE_PAYMENT_STATUS');

// import {refillNumberLookupIsLoadingSelector} from '../reducers/refill-widget';
import {
  selectNumber,
  selectAmount,
  selectEmail,
  selectOrder,
  selectNumberLookup,
  selectOperator
} from '../store';

export const loadInventory = createLoadAction({
  name: 'airfillWidget.inventory',
  uri: '/inventory'
});

export const proccessOperatorPackages = response => {
  const { operator } = response;

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
        .map(pos =>
          operator.packages[
            Math.round((operator.packages.length - 1) * pos)
          ]
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
      item.btcPrice = Math.ceil(item.satoshiPrice / 10000) / 10000;
    });

    response.operator = operator;
  }

  return operator;
};

const loadOperator = createLoadAction({
  name: 'airfillWidget.operator',
  responseTransform: proccessOperatorPackages
});

export const setOperator = (operatorSlug) => (dispatch, getState) => {
  dispatch(loadOperator({operatorSlug, uri: `/inventory/${operatorSlug}`}))
}

const loadNumberLookup = createLoadAction({
  name: 'airfillWidget.numberLookup',
  uri: '/lookup_number',
  responseTransform: proccessOperatorPackages
});

export const lookupRefillNumber = (operatorSlug) => (dispatch, getState) => {
  // const isLoading = refillNumberLookupIsLoadingSelector(getState());
  const state = getState();
  const number = selectNumber(state);
  const operator = selectOperator(state);
  let options = {
    query: {
      number,
      operatorSlug
    }
  };

  // Resolve directly when we already have the correct data
  if (
    operator && operator.slug && operatorSlug === operator.slug && (
    (operator.packages && operator.packages.length) || operator.isRanged
  )) {
    return Promise.resolve();
  }

  // custom credentials for dashboard widget
  if (state.account && state.account.apiKeys) {
    options.password = state.account.apiKeys.secret;
    options.username = state.account.apiKeys.id;
  }

  // Dispatch number lookup
  dispatch(
    loadNumberLookup(options)
  ).then(() => {
    dispatch(setRefillStep(2));
  });
};

const postOrder = createLoadAction({
  name: 'airfillWidget.order',
  uri: '/order'
});

export const createOrder = (orderOptions) => (dispatch, getState) => {
  const state = getState();
  const number = selectNumber(state);
  const amount = selectAmount(state);
  const email = selectEmail(state) || orderOptions.email;
  const operator = selectOperator(state);
  const order = selectOrder(state);

  const options = {
    body: {
      ...orderOptions,
      operatorSlug: operator.result.slug,
      valuePackage: amount,
      number,
      email
    }
  };

  if (order.isLoading || operator.isLoading) {
    return Promise.reject();
  }

  return dispatch(postOrder(options))
};


const fetchOrder = createLoadAction('airfillWidget.order');
export const updateOrderStatus = () => (dispatch, getState) => {
  const order = selectOrder(getState());

  if (order && order.result && order.result.id && order.result.payment && order.result.payment.address) {
    dispatch(
      fetchOrder({uri: `/order/${order.result.id}?incoming_btc_address=${encodeURIComponent(order.result.payment.address)}`})
    )
  }
}

// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './index';

import {updateOrderStatus} from '../actions';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      (process.env.NODE_ENV !== 'production' && window.devToolsExtension) ?
        window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  persistStore(store, { keyPrefix: 'airfill' }, () => {
    store.dispatch(updateOrderStatus())
  });
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem('reduxPersist:airfillWidget');
  }

  return store;
}

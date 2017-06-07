// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './index';
import enhanceStore from './enhanceStore';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      process.env.NODE_ENV !== 'production' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f // add support for Redux dev tools
    )
  );

  // Enable store persistance. Exported as a standalone enhancer to enable
  // reuse when integrating the widget in to other react projects.
  enhanceStore(store);

  return store;
}

// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import airfillWidget from './index';

declare const window: any;

export default function configureStore(routerReducer, middleware) {
  const store = createStore(
    combineReducers({
      airfillWidget,
      router: routerReducer,
    }),
    compose(
      applyMiddleware(thunk, middleware),
      process.env.NODE_ENV !== 'production' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f // add support for Redux dev tools
    )
  );

  // Enable store persistance. Exported as a standalone enhancer to enable
  // reuse when integrating the widget in to other react projects.
  require('./enhanceStore').default(store);

  return store;
}

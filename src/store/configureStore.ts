// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createTracker } from 'redux-segment';
import thunk from 'redux-thunk';

import analyticsEventMap from './analytics-event-map';
import airfillWidget from './index';

declare const window: any;

const tracker = createTracker(analyticsEventMap);

export default function configureStore(routerReducer, middleware) {
  const store = createStore(
    combineReducers({
      airfillWidget,
      router: routerReducer,
    }),
    compose(
      applyMiddleware(thunk, tracker, middleware),
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

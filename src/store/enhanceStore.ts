import { persistStore } from 'redux-persist';

export default function enhanceStore(store) {
  persistStore(store, {
    whitelist: ['airfillWidget'],
    blacklist: ['airfillWidget.operator', 'airfillWidget.order'],
  });

  if (window && window.localStorage && window.localStorage.removeItem) {
    window.localStorage.removeItem('reduxPersist:airfillWidget');
  }
}

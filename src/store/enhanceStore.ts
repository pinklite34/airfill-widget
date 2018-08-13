import { persistStore } from 'redux-persist';

export default function enhanceStore(store) {
  persistStore(store, {
    whitelist: ['airfillWidget'],
    blacklist: ['airfillWidget.operator'],
    keyPrefix: 'airfill',
  });

  if (window && window.localStorage && window.localStorage.removeItem) {
    window.localStorage.removeItem('reduxPersist:airfillWidget');
  }
}

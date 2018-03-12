import { persistStore } from 'redux-persist';
import { updateOrderStatus } from '../actions';

export default function enhanceStore(store) {
  persistStore(
    store,
    { whitelist: 'airfillWidget', keyPrefix: 'airfill' },
    () => {
      store.dispatch(updateOrderStatus());
    }
  );

  if (window && window.localStorage && window.localStorage.removeItem) {
    window.localStorage.removeItem('reduxPersist:airfillWidget');
  }
}

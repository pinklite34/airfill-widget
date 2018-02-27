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
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem('reduxPersist:airfillWidget');
  }
}

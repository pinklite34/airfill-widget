import { combineReducers } from 'redux';
import inventory, {
  selectAvailableOperators,
  selectCountry,
  selectCountryCode,
  selectCountryList,
  selectInventory,
  selectSelectedOperator,
} from './inventory';
import numberLookup, {
  selectIsNumberLookup,
  selectNumberLookup,
  selectNumberLookupError,
} from './numberLookup';
import operator, { selectOperator } from './operator';
import order, { selectOrder } from './order';
import paymentStatus, { selectPaymentStatus } from './paymentStatus';
import recentNumbers, { selectRecentNumbers } from './recentNumbers';
import ui, {
  selectAmount,
  selectComboInputFocus,
  selectComboInputOpen,
  selectEmail,
  selectNumber,
  selectPaymentMethod,
  selectSubscribeNewsletter,
  selectUiState,
  selectValidEmail,
} from './ui';

// Export the reducer for use within other redux apps
export default combineReducers({
  ui,
  inventory,
  operator,
  paymentStatus,
  order,
  recentNumbers,
  numberLookup,
});

// Keep the same state shape when using the standalone widget

export {
  // UI
  selectUiState,
  selectNumber,
  selectAmount,
  selectEmail,
  selectValidEmail,
  selectComboInputOpen,
  selectComboInputFocus,
  selectPaymentMethod,
  // Inventory
  selectCountry,
  selectCountryList,
  selectCountryCode,
  selectAvailableOperators,
  selectSelectedOperator,
  selectInventory,
  selectSubscribeNewsletter,
  // Operator
  selectOperator,
  // Payment status
  selectPaymentStatus,
  // Order
  selectOrder,
  // Recent numbers
  selectRecentNumbers,
  // Number lookup
  selectNumberLookup,
  selectIsNumberLookup,
  selectNumberLookupError,
};

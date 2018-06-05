import { combineReducers } from 'redux';
import ui, {
  selectUiState,
  selectNumber,
  selectAmount,
  selectEmail,
  selectValidEmail,
  selectComboInputOpen,
  selectComboInputFocus,
  selectPaymentMethod,
  selectSubscribeNewsletter,
} from './ui';
import paymentStatus, { selectPaymentStatus } from './paymentStatus';
import inventory, {
  selectCountry,
  selectCountryList,
  selectCountryCode,
  selectAvailableOperators,
  selectSelectedOperator,
  selectInventory,
} from './inventory';
import operator, { selectOperator } from './operator';
import order, { selectOrder } from './order';
import recentNumbers, { selectRecentNumbers } from './recentNumbers';
import numberLookup, {
  selectNumberLookup,
  selectIsNumberLookup,
  selectNumberLookupError,
} from './numberLookup';

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

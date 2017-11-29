import { combineReducers } from 'redux';
import ui, {
  selectUiState,
  selectNumber,
  selectAmount,
  selectEmail,
  selectValidEmail,
  selectCurrentStep,
  selectComboInputOpen,
  selectComboInputFocus
} from './ui';
import paymentStatus, { selectPaymentStatus } from './paymentStatus';
import inventory, {
  selectCountry,
  selectCountryList,
  selectCountryCode,
  selectAvailableOperators,
  selectSelectedOperator,
  selectInventory
} from './inventory';
import operator, { selectOperator } from './operator';
import order, { selectOrder } from './order';
import recentNumbers, { selectRecentNumbers } from './recentNumbers';
import numberLookup, {
  selectNumberLookup,
  selectIsNumberLookup,
  selectNumberLookupError
} from './numberLookup';

// Export the reducer for use within other redux apps
export const airfillWidget = combineReducers({
  ui,
  inventory,
  operator,
  paymentStatus,
  order,
  recentNumbers,
  numberLookup
});

// Keep the same state shape when using the standalone widget
export default combineReducers({ airfillWidget });

export {
  // UI
  selectUiState,
  selectNumber,
  selectAmount,
  selectEmail,
  selectValidEmail,
  selectCurrentStep,
  selectComboInputOpen,
  selectComboInputFocus,
  // Inventory
  selectCountry,
  selectCountryList,
  selectCountryCode,
  selectAvailableOperators,
  selectSelectedOperator,
  selectInventory,
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
  selectNumberLookupError
};

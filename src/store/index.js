import {combineReducers} from 'redux';
import ui, {
  selectUiState,
  selectNumber,
  selectAmount,
  selectEmail,
  selectCurrentStep
} from './ui';
import numberLookup, { selectNumberLookup } from './numberLookup';
import paymentStatus, { selectPaymentStatus } from './paymentStatus';
import inventory, { selectCountry, selectCountryList, selectAvailableOperators, selectSelectedOperator } from './inventory';
import operator, { selectOperator } from './operator';
import order, { selectOrder } from './order';

// Export the reducer for use within other redux apps
export const airfillWidget = combineReducers({
  ui,
  inventory,
  operator,
  numberLookup,
  paymentStatus,
  order
});

// Keep the same state shape when using the standalone widget
export default combineReducers({airfillWidget})

export {
  // UI
  selectUiState,
  selectNumber,
  selectAmount,
  selectEmail,
  selectCurrentStep,

  // Inventory
  selectCountry,
  selectCountryList,
  selectAvailableOperators,
  selectSelectedOperator,

  // Operator
  selectOperator,

  // Number lookup
  selectNumberLookup,

  // Payment status
  selectPaymentStatus,

  // Order
  selectOrder
}

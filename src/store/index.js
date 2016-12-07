import {combineReducers} from 'redux';
import ui, {
  selectUiState,
  selectNumber,
  selectAmount,
  selectEmail,
  selectCurrentStep
} from './ui';
import numberLookup, { selectNumberLookup, selectOperator } from './numberLookup';
import paymentStatus, { selectPaymentStatus } from './paymentStatus';
import order, { selectOrder } from './order';

// Export the reducer for use within other redux apps
export const airfillWidget = combineReducers({
  ui,
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

  // Number lookup
  selectNumberLookup,
  selectOperator,

  // Payment status
  selectPaymentStatus,

  // Order
  selectOrder
}

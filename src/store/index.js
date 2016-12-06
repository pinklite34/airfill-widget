import {combineReducers} from 'redux';
import ui, {
  selectWidgetState,
  selectNumber,
  selectAmount,
  selectEmail,
  selectCurrentStep
} from './ui';
import numberLookup, { selectNumberLookup, selectOperator } from './numberLookup';
import paymentStatus, { selectPaymentStatus } from './paymentStatus';
import order, { selectOrder } from './order';

export default combineReducers({
  ui,
  numberLookup,
  paymentStatus,
  order
});

export {
  // UI
  selectWidgetState,
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

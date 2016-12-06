import { REHYDRATE } from 'redux-persist/constants';
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

export default (state={}, action) => {
  if (action.type === REHYDRATE) {
    return action.payload
  }

  return {
    ui: ui(state.ui, action),
    numberLookup: numberLookup(state.numberLookup, action),
    paymentStatus: paymentStatus(state.paymentStatus, action),
    order: order(state.order, action)
  }
};

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

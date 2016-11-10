import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist/constants';
import {
  createCollectionReducer,
  createSingleResultSelector
} from '../lib/rest-helpers';

const uiReducer = (
  state={
    currentStep: 1,
    number: null,
    operatorId: null,
    amount: 0,
    email: { value: '', valid: false, error: false }
  }, {type, payload}
) => {
  switch (type) {
    case 'SET_STEP': {
      const currentStep = (payload > 0 && payload < 4)
        ? payload : state.currentStep;
      return { ...state, currentStep };
    }

    case REHYDRATE: {
      const incoming = payload.refillWidget;

      if (incoming) {
        const { number, country, countryName, email } = incoming.ui;
        return {
          ...state,
          number,
          country,
          countryName,
          email: {
            value: (email ? email.value : ''),
            valid: (email ? email.valid : false),
            error: (email ? email.error : false)
          }
        };
      }

      return state;
    }

    case 'SET_NUMBER': {
      const {
        number=state.number,
        country=state.country,
        countryName=state.countryName
      } = payload;

      let autoDetectedOperator;

      if (number === state.number) {
        // Only persist auto detected operator slug if the number is the same
        autoDetectedOperator = state.autoDetectedOperator;
      }

      return {
        ...state,
        number,
        country,
        countryName,
        autoDetectedOperator
      };
    }

    case 'SET_OPERATOR': {
      return { ...state, operatorId: payload };
    }

    case 'SET_AMOUNT': {
      return { ...state, amount: payload };
    }

    case 'SET_EMAIL': {
      const { value, inFocus } = payload;
      const valid = !!value.match(/.+@.+\..+/);

      // Only update error value if inFocus and valid,
      // otherwise hold of the error until blur
      const error = inFocus ? (valid ? false : state.email.error) : !valid;

      return { ...state, email: { value, valid, error } };
    }

    case 'LOAD_NUMBERLOOKUP_SUCCESS': {
      const {operator} = payload;
      let nextState = state;

      if (operator) {
        // Preselect middle package is possible
        if (operator.packages) {
          const {packages} = operator;
          const middle = Math.round((packages.length - 1) * 0.5);

          if (packages[middle]) {
            nextState = { ...state, amount: packages[middle].value };
          }
        }

        // Persist the auto detected operator slug if not set
        nextState = {
          ...nextState,
          autoDetectedOperator: state.autoDetectedOperator == null ?
            operator.slug : state.autoDetectedOperator
        };
      } else {
        // Auto detect failed
        nextState = { ...nextState, autoDetectedOperator: false };
      }

      return nextState;
    }

    default:
      return state;
  }
};

const paymentStatusReducer = (state={}, {type, payload}) => {
  if (type === 'UPDATE_PAYMENT_STATUS') {
    const { orderId, status, data } = payload;

    const nextState = { ...state };
    nextState[orderId] = { status };

    if (status === 'partial') {
      nextState[orderId].paidAmount = data;
    }
    if (status === 'failed') {
      nextState[orderId].failureData = data;
    }
    if (status === 'delivered') {
      nextState[orderId].deliveryData = data;
    }

    return nextState;
  }

  return state;
};


const numberLookupReducer = createCollectionReducer('numberLookup');
const orderReducer = createCollectionReducer('order');

export default combineReducers({
  ui: uiReducer,
  numberLookup: numberLookupReducer,
  paymentStatus: paymentStatusReducer,
  order: orderReducer
});

export const selectWidgetState = state => state.ui;
export const selectNumber = state => selectWidgetState(state).number;
export const selectAmount = state => selectWidgetState(state).amount;
export const selectCurrentStep = state => selectWidgetState(state).currentStep;
export const selectEmail = state => {
  const email = selectWidgetState(state).email;
  return email.valid ? email.value : '';
};

export const selectOrder = createSingleResultSelector('order');
export const selectNumberLookup = createSingleResultSelector('numberLookup');
export const selectOperator = state => {
  const lookup = selectNumberLookup(state);
  return lookup.result ? lookup.result.operator : null;
};

export const selectPaymentStatus = (state) => {
  const order = selectOrder(state);
  if (order.result && order.result.orderId) {
    return state.paymentStatus[order.result.orderId] || {};
  }
  return {};
};

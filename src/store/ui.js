import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  currentStep: 1,
  number: '',
  operatorId: null,
  amount: 0,
  email: { value: '', valid: false, error: false }
};

export default (state=initialState, {type, payload}) => {
  switch (type) {
    case REHYDRATE: {
      const data = payload.airfillWidget && selectUiState(payload);
      return { ...state, ...data };
    }

    case 'SET_STEP': {
      return { ...state, currentStep: payload };
    }

    case 'SET_NUMBER': {
      return { ...state, number: payload };
    }

    case 'SET_COUNTRY': {
      return { ...state, number: '' };
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

    case 'LOAD_OPERATOR_SUCCESS': {
      const {packages} = payload;
      const middle = Math.round((packages.length - 1) * 0.5);

      if (packages[middle]) {
        return { ...state, amount: packages[middle].value };
      }

      return state;
    }

    default:
      return state;
  }
};

export const selectUiState = state => state.airfillWidget.ui;
export const selectNumber = state => selectUiState(state).number;
export const selectAmount = state => selectUiState(state).amount;
export const selectCurrentStep = state => selectUiState(state).currentStep;
export const selectEmail = state => {
  const email = selectUiState(state).email;
  return email.valid ? email.value : '';
};

import {parse, format} from 'libphonenumber-js';
import {REHYDRATE} from 'redux-persist/constants';
import {selectCountry} from './inventory';

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

    default:
      return state;
  }
};

export const selectUiState = state => state.airfillWidget.ui;
export const selectAmount = state => selectUiState(state).amount;
export const selectCurrentStep = state => selectUiState(state).currentStep;

export const selectNumber = state => {
  const number = selectUiState(state).number;
  const country = selectCountry(state);
  let parsedNumber;

  if (!number || !country) {
    return number;
  }

  // Make sure to always include country code in number, this is needed because
  // a valid number can be provided through the defaultNumber option without
  // including a country code before the country has been selected
  try {
    parsedNumber = parse(number, country && country.alpha2);
    if (parsedNumber && parsedNumber.country) {
      return format(parsedNumber,  'International');
    }
  } catch (e) {}

  return number;
}

export const selectEmail = state => selectUiState(state).email;
export const selectValidEmail = state => {
  const email = selectEmail(state);
  return email && email.valid ? email.value : null;
}

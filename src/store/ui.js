import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  currentStep: 1,
  number: null,
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
      const currentStep = (payload > 0 && payload < 4)
        ? payload : state.currentStep;
      return { ...state, currentStep };
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

export const selectUiState = state => state.airfillWidget.ui;
export const selectNumber = state => selectUiState(state).number;
export const selectAmount = state => selectUiState(state).amount;
export const selectCurrentStep = state => selectUiState(state).currentStep;
export const selectEmail = state => {
  const email = selectUiState(state).email;
  return email.valid ? email.value : '';
};

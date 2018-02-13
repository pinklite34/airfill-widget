const errorMessages = {
  'Number is not valid':
    'It seems like the number you entered is invalid. Please make sure all digits were entered correctly.',
  'Country not supported':
    "Unfortunately we currently don't support phone numbers from the country you entered.",
}

const initialState = {
  isLoading: false,
  error: null,
  number: null,
  country: null,
  operator: null,
  altOperators: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_NUMBERLOOKUP':
      return {
        ...state,
        number:
          action.payload && action.payload.query && action.payload.query.number,
        isLoading: true,
      }

    case 'LOAD_NUMBERLOOKUP_ERROR': {
      const error = action.payload
      const message = error.message || error

      return {
        ...state,
        isLoading: false,
        error: errorMessages[message] || message,
      }
    }

    case 'LOAD_NUMBERLOOKUP_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        country: action.payload.country,
        operator: action.payload.operator,
        altOperators: action.payload.altOperators,
      }

    case 'RESET_NUMBERLOOKUP':
      return initialState

    default:
      return state
  }
}

export const selectNumberLookup = state => state.airfillWidget.numberLookup
export const selectIsNumberLookup = state => {
  const numberLookup = selectNumberLookup(state)

  return numberLookup && !!numberLookup.altOperators
}

export const selectNumberLookupError = state => {
  const numberLookup = selectNumberLookup(state)

  if (numberLookup && numberLookup.error) {
    return numberLookup.error.message || numberLookup.error
  }

  return null
}

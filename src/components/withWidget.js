import { connect } from 'react-redux';

import {
  selectCountry,
  selectCountryList,
  selectAvailableOperators,
  selectNumber,
  selectRecentNumbers,
  selectNumberLookup,
} from '../store';

import {
  setCountry,
  setOperator,
  setNumber,
  useRecentRefill,
  lookupNumber,
  resetNumberLookup,
} from '../actions';

export default function withWidget(Component) {
  return connect(
    state => ({
      country: selectCountry(state),
      countryList: selectCountryList(state),
      operators: (() => {
        const operators = selectAvailableOperators(state);
        return Object.keys(operators).reduce(
          (acc, type) =>
            acc.concat(
              operators[type].map(operator => ({ ...operator, type }))
            ),
          []
        );
      })(),
      number: selectNumber(state),
      recentNumbers: selectRecentNumbers(state),
      numberLookup: selectNumberLookup(state),
    }),
    {
      setCountry,
      setOperator,
      setNumber,
      useRecentRefill,
      lookupNumber,
      resetNumberLookup,
    }
  )(Component);
}

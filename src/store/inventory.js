import {
  createCollectionReducer,
  createSingleResultSelector,
} from '../lib/rest-helpers';

import { getMissingCountries } from '../lib/countries';

const sortBy = (field, reverse, primer) => {
  const key = x => (primer ? primer(x[field]) : x[field]);
  return (a, b) => {
    const A = key(a);
    const B = key(b);
    return (A < B ? -1 : A > B ? 1 : 0) * [1, -1][+!!reverse];
  };
};

const toArray = map => Object.keys(map).map(key => map[key]);

const collectionReducer = createCollectionReducer('airfillWidget.inventory');
export default (state, action) => {
  state = collectionReducer(state, action);

  switch (action.type) {
    case 'SET_COUNTRY': {
      return {
        ...state,
        selectedCountry: action.payload,
      };
    }
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        selectedMethod: action.payload,
      };
    case 'LOAD_OPERATOR': {
      return {
        ...state,
        selectedOperator: action.payload.operatorSlug,
      };
    }
    case 'LOAD_OPERATOR_SUCCESS': {
      return {
        ...state,
        selectedOperator: action.payload.slug,
        selectedCountry: action.payload.countryCode,
      };
    }

    default:
      return state;
  }
};

export const selectInventory = createSingleResultSelector(
  'airfillWidget.inventory'
);

export const selectCountryList = state => {
  const inventory = selectInventory(state).result;
  if (!inventory) {
    return [];
  }

  const countries = toArray(inventory);
  const remaining = getMissingCountries(countries);

  return [...countries, ...remaining].sort(sortBy('name'));
};

export const selectCountry = state => {
  const inventory = selectInventory(state).result;
  const selected = state.airfillWidget.inventory.selectedCountry;

  if (inventory && selected) {
    // inventory contains selected country
    if (selected in inventory) {
      return inventory[selected];
    } else {
      // inventory does not contain the country, grab it from missing countries
      return getMissingCountries(toArray(inventory)).find(
        x => x.alpha2 === selected
      );
    }
  }
  return null;
};

export const selectCountryCode = state =>
  state.airfillWidget.inventory.selectedCountry || null;

export const selectAvailableOperators = state => {
  const country = selectCountry(state);
  if (!country) {
    return {};
  }

  const operators = toArray(country.operators);

  if (!operators) {
    return null;
  }

  return operators
    .sort(sortBy('stats', true, stats => (stats ? stats.popularity : -1)))
    .reduce((mem, operator) => {
      const type = operator.type ? operator.type.toLowerCase() : 'mobile';
      mem[type] = mem[type] || [];
      mem[type].push(operator);
      return mem;
    }, {});
};

export const selectSelectedOperator = state => {
  const operator = state.airfillWidget.inventory.selectedOperator;
  const country = selectCountry(state);

  if (operator && country && operator in country.operators) {
    return country.operators[operator];
  }

  return null;
};

export const selectPaymentMethod = state => console.log(state);

import * as worldCountries from '../countries.json';
import { getCountryCallingCode } from 'libphonenumber-js';

const selectInternational = countryList =>
  countryList.find(x => x.name === 'International');

// returns missing countries (no providers)
export const getMissingCountries = countryList =>
  (worldCountries as any)
    .filter(x => !countryList.some(x1 => x1.alpha2 === x.alpha2))
    .map(country => {
      let code;

      try {
        code = '+' + getCountryCallingCode(country.alpha2);
      } catch (ex) {}

      const international = selectInternational(countryList);

      return {
        ...country,
        countryCallingCodes: [code],
        operators: international ? international.operators : [],
        slug: country.name.toLowerCase().replace(' ', ''),
      };
    });

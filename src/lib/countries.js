import worldCountries from '../countries.json';
import { getCountryCallingCode } from 'libphonenumber-js';

const selectInternational = countryList =>
  countryList && countryList.find(x => x.name === 'International');

// returns missing countries (no providers)
export const getMissingCountries = countryList => {
  const international = selectInternational(countryList);
  const operators = international ? international.operators : {};

  return worldCountries
    .filter(x => !countryList.some(x1 => x1.alpha2 === x.alpha2))
    .map(country => {
      let code;

      try {
        code = '+' + getCountryCallingCode(country.alpha2);
      } catch (ex) {}

      return {
        ...country,
        countryCallingCodes: [code],
        operators,
        slug: country.name.toLowerCase().replace(' ', ''),
      };
    });
};

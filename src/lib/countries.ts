import { CountryCode, getCountryCallingCode } from 'libphonenumber-js';

import worldCountries from '../world-countries';

const selectInternational = countryList =>
  countryList.find(x => x.name === 'International');

// returns missing countries (no providers)
export const getMissingCountries = countryList =>
  worldCountries
    .filter(x => !countryList.some(x1 => x1.alpha2 === x.alpha2))
    .map(country => {
      let code;

      try {
        code = '+' + getCountryCallingCode(country.alpha2 as CountryCode);
      } catch (ex) {}

      const international = selectInternational(countryList);

      return {
        ...country,
        countryCallingCodes: [code],
        operators: international ? international.operators : [],
        slug: country.name.toLowerCase().replace(' ', ''),
      };
    });

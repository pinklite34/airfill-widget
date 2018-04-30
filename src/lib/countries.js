import worldCountries from '../countries.json';
import { getCountryCallingCode } from 'libphonenumber-js';

// returns missing countries (no providers)
export const getMissingCountries = countryList =>
  worldCountries
    .filter(x => !countryList.some(x1 => x1.alpha2 === x.alpha2))
    .map(country => {
      let code;

      try {
        code = '+' + getCountryCallingCode(country.alpha2);
      } catch (ex) {}

      return {
        ...country,
        countryCallingCodes: [code],
        operators: {},
        slug: country.name.toLowerCase().replace(' ', ''),
      };
    });

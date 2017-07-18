import { parse, format } from 'libphonenumber-js';

const getCountryData = country => {
  if (country) {
    const countryCode = country.countryCallingCodes[0] || null;
    const iso2 = country.alpha2 || null;
    return { countryCode, iso2 };
  }
  return { countryCode: null, iso2: null };
};

export const isPhoneNumber = type =>
  !type || ['voip', 'data'].indexOf(type.toLowerCase()) > -1;

export const formatNumber = (type, number, country) => {
  // Format any number type in a good way for persistance and api calls. Will
  // add country code if missing.
  const { iso2, countryCode } = getCountryData(country);

  if (isPhoneNumber(type)) {
    const validNumber = parseNumber(number, country);
    if (validNumber) {
      return format(validNumber, iso2, 'International');
    }
  }

  if (number.indexOf('+') < 0) {
    return `${countryCode} ${number}`;
  }

  return number;
};

export const formatDefaultValue = (type, number, country) => {
  // Format /phone/ numbers with country code, hide it for other number types.
  // Default to just the country code for phone numbers and an empty string for
  // other number types. Used to format numbers for use in input fields.
  const { countryCode } = getCountryData(country);

  if (isPhoneNumber(type)) {
    return formatNumber(type, number, country) || `${countryCode} `;
  } else if (number) {
    return String(number).replace(countryCode, '').trim();
  }
  return '';
};

export const formatDisplayValue = (type, number, country) => {
  const { countryCode } = getCountryData(country);

  return isPhoneNumber(type) && number
    ? formatNumber(type, number, country)
    : String(number).replace(countryCode, '').trim();
};

export const parseNumber = (number, country) => {
  // Try to parse numbers - no matter how badly formatted they are
  const { iso2, countryCode } = getCountryData(country);

  if (!number) {
    return null;
  }

  // Try to validate number
  let parsedNumber;
  try {
    parsedNumber = parse(number.replace(/[^\d+]/, ''), iso2);
  } catch (e) {}

  if (parsedNumber && parsedNumber.phone && parsedNumber.country) {
    // Number is valid, return it
    return parsedNumber.phone;
  } else if (number.charAt(0) !== '+') {
    // Number lacks country code - add it and try again
    return parseNumber(countryCode + number);
  }

  // Number is not valid
  return null;
};

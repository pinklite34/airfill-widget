import { AsYouType } from 'libphonenumber-js';
import { parse, format } from 'input-format';

const SINGLE_PHONENUMBER_CHAR = /(\d|\+)/;
const PHONENUMBER = /^[+\-0-9 ()]+/;

const isPhoneNumberChar = char =>
  SINGLE_PHONENUMBER_CHAR.test(char) ? char : undefined;

export const isPhoneNumber = value => PHONENUMBER.test(value);

// Removes the closest digit before index
export const removePreviousDigit = (string, index) => {
  const characters = string.split('');
  const previousDigitIndex = characters.reduce(
    (lastIndex, curVal, curIndex) =>
      SINGLE_PHONENUMBER_CHAR.test(curVal) && curIndex < index
        ? curIndex
        : lastIndex,
    null
  );

  return previousDigitIndex !== null
    ? string
        .slice(0, previousDigitIndex)
        .concat(string.slice(previousDigitIndex + 1))
    : string.slice(index); // Remove everything before index
};

// Removes the closest digit after index
export const removeNextDigit = (string, index) => {
  const characters = string.slice(index).split('');
  const nextDigitIndex = characters.reduce(
    (nextIndex, curVal, curIndex) =>
      nextIndex === null && SINGLE_PHONENUMBER_CHAR.test(curVal)
        ? curIndex
        : nextIndex,
    null
  );

  return nextDigitIndex !== null
    ? string
        .slice(0, index + nextDigitIndex)
        .concat(string.slice(index + nextDigitIndex + 1))
    : string.slice(0, index); // Remove everything after index
};

export const formatNumber = (countryCode, inputValue, currentCaret) => {
  if (isPhoneNumber(inputValue)) {
    // Strip everything but digits and +
    const { value, caret } = parse(inputValue, currentCaret, isPhoneNumberChar);

    const formatter = new AsYouType(countryCode) // eslint-disable-line
    const formattedNumber = formatter.input(value);

    const { caret: nextCaret } = format(value, caret, () => ({
      text: formattedNumber,
      template: formatter.template,
    }));

    if (
      (formatter.country &&
        formatter.chosen_format == null &&
        inputValue.indexOf(formatter.country_metadata[0]) === 0) ||
      (!formatter.country && inputValue.indexOf('+') < 0)
    ) {
      return formatNumber(countryCode, `+${inputValue}`, inputValue.length + 1);
    } else {
      return {
        formattedValue: formattedNumber,
        number: value,
        country: formatter.country,
        caret: nextCaret,
      };
    }
  } else {
    return null;
  }
};

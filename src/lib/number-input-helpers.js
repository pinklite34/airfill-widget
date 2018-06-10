import { AsYouType } from 'libphonenumber-js';
import { parse, format } from 'input-format';

const SINGLE_PHONENUMBER_CHAR = /(\d|\+)/;
const PHONENUMBER = /^[+\-0-9 ()]+/;

export const isPhoneNumber = value => PHONENUMBER.test(value);

const isPhoneNumberChar = char =>
  SINGLE_PHONENUMBER_CHAR.test(char) ? char : undefined;

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

export const formatNumber = (country, inputValue, caretStart) => {
  if (inputValue && isPhoneNumber(inputValue)) {
    // Strip everything but digits and +
    const { value, caret: caretBefore } = parse(
      inputValue,
      caretStart,
      isPhoneNumberChar
    );

    const formatter = new AsYouType(country && country.alpha2) // eslint-disable-line
    const formattedNumber = formatter.input(inputValue);

    const { caret: caretAfter } = format(value, caretBefore, () => ({
      text: formattedNumber,
      template: formatter.template,
    }));

    return {
      formattedValue: formattedNumber,
      number: value,
      country: formatter.country,
      caret: caretAfter,
    };
  } else {
    return null;
  }
};

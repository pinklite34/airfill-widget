import { format, parse } from 'input-format';
import { AsYouType } from 'libphonenumber-js';

const SINGLE_PHONENUMBER_CHAR = /(\d|\+)/;
const PHONENUMBER = /^[+\-0-9 ()]+/;

const isPhoneNumberChar = char =>
  SINGLE_PHONENUMBER_CHAR.test(char) ? char : undefined;

export const isPhoneNumber = value => PHONENUMBER.test(value);

// Removes the closest digit before index
export const removePreviousDigit = (s: string, index: number) => {
  const characters = s.split('');
  const previousDigitIndex = characters.reduce(
    (lastIndex, curVal, curIndex) =>
      SINGLE_PHONENUMBER_CHAR.test(curVal) && curIndex < index
        ? curIndex
        : lastIndex,
    null
  );

  return previousDigitIndex !== null
    ? s
        .slice(0, Number(previousDigitIndex))
        .concat(s.slice(Number(previousDigitIndex) + 1))
    : s.slice(index); // Remove everything before index
};

// Removes the closest digit after index
export const removeNextDigit = (s, index) => {
  const characters = s.slice(index).split('');
  const nextDigitIndex = characters.reduce(
    (nextIndex, curVal, curIndex) =>
      nextIndex === null && SINGLE_PHONENUMBER_CHAR.test(curVal)
        ? curIndex
        : nextIndex,
    null
  );

  return nextDigitIndex !== null
    ? s
        .slice(0, index + nextDigitIndex)
        .concat(s.slice(index + nextDigitIndex + 1))
    : s.slice(0, index); // Remove everything after index
};

export const formatNumber = (country, inputValue, currentCaret) => {
  if (inputValue && isPhoneNumber(inputValue)) {
    // Strip everything but digits and +
    const { value, caret } = parse(inputValue, currentCaret, isPhoneNumberChar);

    const formatter = new AsYouType(country && country.alpha2); // eslint-disable-line
    const formattedValue = formatter.input(value);

    const { caret: nextCaret } = format(value, caret, () => ({
      text: formattedValue,
      template: formatter.template,
    }));

    return {
      formattedValue,
      number: value,
      country: formatter.country,
      caret: nextCaret,
    };
  } else {
    return null;
  }
};

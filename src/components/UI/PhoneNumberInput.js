import React, {Component} from 'react';
import styled from 'styled-components';
import { parse, format } from 'libphonenumber-js';
import Field from './Field';

const PhoneNumberField = styled(Field)`
  .refill-field {
    display: flex;
    justify-content: flex-start;
  }
  .refill-number-field-input {
    flex: 1 1 auto;
    width: auto;
    min-width: 100px;
    max-width: 20em;
    margin-right: 8px;
  }
`

const getErrorMessage = error => {
  const messages = {
    'Country not supported':
      'We\'re sorry, but this country is not supported right now.',
    'Country code needed':
      'Please enter the number including a country code, starting with \'+\'.',
    'Phone number entered is too short':
      'The number you entered is too short. Are you sure it is correct?'
  };
  if (error in messages) {
    return messages[error];
  } else if (error && error.indexOf('Number is not valid') !== -1 || error === true) {
    return 'This is not a valid phone number. Make sure it is correct and try again!';
  }
  return error;
};


class PhoneNumberInput extends Component {
  getCountryCode = () => {
    const {country} = this.props;
    return country ? country.countryCallingCodes[0] : undefined;
  }

  getAlpha2 = () => {
    const { country={} } = this.props;
    const { alpha2=null } = country;
    return alpha2;
  }

  formatDefaultValue = () => {
    let { defaultValue = '' } = this.props;

    const cc = this.getCountryCode();
    const alpha2 = this.getAlpha2();
    const number = defaultValue.replace(/[^\d\+]/, '');
    const validNumber = this.validateNumber(number);

    defaultValue = validNumber
      ? format(validNumber, alpha2, 'International')
      : number;

    return defaultValue || `${cc} `;
  }

  validateNumber = (number) => {
    const cc = this.getCountryCode();
    const alpha2 = this.getAlpha2();

    if (!number) {
      return null;
    }

    // Try to validate number
    const { country, phone } = parse(number, alpha2);

    if (phone && country) {
      // Number is valid, return it
      return phone;
    } else if (number.charAt(0) !== '+') {
      // Number lacks country code - add it and try again
      return this.validateNumber(cc + number);
    }

    // Number is not valid
    return null
  }

  handleChange = (event) => {
    const number = event.target.value.replace(/[^\d\+]/, '');

    const validNumber = this.validateNumber(number);
    const {country: { alpha2 }} = this.props;

    if (this.props.onChange) {
      this.props.onChange(validNumber ?
        format(validNumber, alpha2, 'International') : number
      )
    }
  }


  render() {
    const {label, hint, error, children} = this.props;

    return (
      <PhoneNumberField
        className="refill-number-field"
        label={label || 'Phone number'}
        hint={hint || 'The phone number to top up'}
        error={getErrorMessage(error)}
      >
        <input
          className="refill-number-field-input"
          type="tel"
          onChange={this.handleChange}
          defaultValue={this.formatDefaultValue()}
        />
        {children}
      </PhoneNumberField>
    );
  }
}

export default PhoneNumberInput;

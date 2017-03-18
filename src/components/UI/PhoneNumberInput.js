import React, {Component} from 'react';
import styled from 'styled-components';
import { parse, format } from 'libphonenumber-js';
import Field from './Field';

const PhoneNumberField = styled(Field)`
  .refill-field {
    display: flex;
    justify-content: flex-start;
  }
  .refill-number-field-input-wrapper {
    min-height: 40px;
    border: 1px solid #ccc;
    border-radius: 2px;

    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: #fff;
    max-width: 20em;
    margin-right: 8px;

    .refill-number-field-cc {
      display: block;
      color: #777;
      margin: 0 -4px 0 8px;
      position: relative;
      z-index: 2;
    }

    .refill-number-field-input {
      border: none;
      flex: 1 1 auto;
      width: auto;
      min-width: 100px;
      outline: none;
    }
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

  formatDefaultValue = () => {
    const {defaultValue} = this.props;
    const cc = this.getCountryCode()

    if (!defaultValue) {
      return ''
    }

    if (defaultValue.indexOf(cc + ' ') === 0) {
      return defaultValue.substr(cc.length + 1)
    } else if (defaultValue.indexOf(cc) === 0) {
      return defaultValue.substr(cc.length)
    }

    return defaultValue
  }

  validateNumber = (number) => {
    const cc = this.getCountryCode();
    const {country: { alpha2 }} = this.props;

    if (!number) {
      return null;
    }

    let { country, phone } = parse(number, alpha2);

    if (phone && country === alpha2) {
      return phone
    } else if (number.charAt(0) !== '+') {
      return this.validateNumber(cc + number);
    }

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
        <div className="refill-number-field-input-wrapper">
          <span className="refill-number-field-cc">{this.getCountryCode()}</span>
          <input
            className="refill-number-field-input"
            type="tel"
            onChange={this.handleChange}
            defaultValue={this.formatDefaultValue()}
           />
        </div>
        {children}
      </PhoneNumberField>
    );
  }
}

export default PhoneNumberInput;

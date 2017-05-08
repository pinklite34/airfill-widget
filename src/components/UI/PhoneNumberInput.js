import React, { Component } from 'react';
import styled from 'styled-components';
import {
  isPhoneNumber,
  formatNumber,
  formatDefaultValue
} from '../../lib/number-helpers';
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
`;

const getErrorMessage = error => {
  const messages = {
    'Country not supported': "We're sorry, but this country is not supported right now.",
    'Country code needed': "Please enter the number including a country code, starting with '+'.",
    'Phone number entered is too short': 'The number you entered is too short. Are you sure it is correct?'
  };
  if (error in messages) {
    return messages[error];
  } else if (
    (error && error.indexOf('Number is not valid') !== -1) ||
    error === true
  ) {
    return 'This is not a valid phone number. Make sure it is correct and try again!';
  }
  return error;
};

class PhoneNumberInput extends Component {
  formatDefaultValue = () => {
    let { type, country, defaultValue = '' } = this.props;
    return formatDefaultValue(type, defaultValue, country);
  };

  formatNumber = number => {
    const { type, country } = this.props;
    return formatNumber(type, number, country);
  };

  handleChange = event => {
    const number = event.target.value;

    if (this.props.onChange) {
      this.props.onChange(this.formatNumber(number));
    }
  };

  render() {
    const { label, hint, error, children, type } = this.props;
    const defaultLabel = type ? 'Account number' : 'Phone number';
    const defaultHint = isPhoneNumber(type)
      ? 'The phone number to top up'
      : `The ${type} account number to top up`;
    const defaultValue = this.formatDefaultValue();

    return (
      <PhoneNumberField
        className="refill-number-field"
        label={label || defaultLabel}
        hint={hint || defaultHint}
        error={getErrorMessage(error)}
      >
        <input
          className="refill-number-field-input"
          type="tel"
          onChange={this.handleChange}
          defaultValue={defaultValue}
          key={type} /* needed to reset the default value in type change */
        />
        {children}
      </PhoneNumberField>
    );
  }
}

export default PhoneNumberInput;

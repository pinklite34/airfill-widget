import React, {Component} from 'react';

import Cleave from 'cleave.js/dist/cleave-react';
import 'cleave.js/dist/addons/cleave-phone.i18n';

import Field from './Field';

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
  } else if (error && error.indexOf('not a valid phone number') !== -1) {
    return 'This is not a valid phone number. Make sure it is correct and try again!';
  }
  return error;
};


class PhoneNumberInput extends Component {
  render() {
    const {label, hint, error, country, value, className, children, onChange} = this.props;
    const defaultValue = country ? country.countryCallingCodes[0] : undefined;

    return (
      <Field
        className="refill-number-field"
        label={label || 'Phone number'}
        hint={hint || 'The phone number to top up'}
        error={getErrorMessage(error)}
      >
        <Cleave
          options={{phone: true, phoneRegionCode: country ? country.alpha2 : undefined}}
          onChange={onChange}
          value={value || (value == null ? defaultValue : '')}
          placeholder={defaultValue}
          type="tel"
          size="40"
        />
        {children}
      </Field>
    );
  }
}

export default PhoneNumberInput;

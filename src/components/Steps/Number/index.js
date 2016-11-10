import React, {Component} from 'react';
import Step from '../Step';
import Field from '../Field';
import Button from '../../UI/Button';

import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!react-intl-tel-input/dist/libphonenumber.js';
import 'react-intl-tel-input/dist/main.css';

const getErrorMessage = error => {
  const messages = {
    'Country not supported':
      "We're sorry, but this country is not supported right now.",
    'Country code needed':
      "Please enter the number including a country code, starting with '+'.",
    'Phone number entered is too short':
      "The number you entered is too short. Are you sure it is correct?"
  };
  if (error in messages) {
    return messages[error];
  } else if (error && error.indexOf('not a valid phone number') !== -1) {
    return "This is not a valid phone number. Make sure it is correct and try again!";
  }
  return "Unknown error occurred. Please try again later or report to support@bitrefill.com";
};

class NumberStep extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.number && nextProps.number) {
      this.refs.intlTelInput.setNumber(nextProps.number);
    }
  }

  render () {
    const {
      expanded,
      onNumberChange,
      onContinue,
      onBack,
      showSummary,
      country,
      countryName,
      numberLookup: { isLoading, error },
      number
    } = this.props;

    const stepProps = {
      number: 1,
      title: "Enter Phone Number",
      showSummary,
      expanded,
      onBack
    };

    if (expanded) {
      return (
        <Step {...stepProps} onSubmit={()=>number && onContinue()}>
          <Field
            className="refill-number-field"
            error={error && getErrorMessage(error)}
            hint="Enter a phone number. To send a refill to another country
            enter an international number starting with '+' or click on the
            flag above."
          >
            <IntlTelInput
              css={['intl-tel-input', error && 'refill-error']}
              utilsScript={'/libphonenumber.js'}
              onPhoneNumberChange={
                (status, value, country, number) => onNumberChange({
                  number,
                  country: country.iso2,
                  countryName: country.name
                })
              }
              onSelectFlag={
                (country) => onNumberChange({
                  country: country.iso2,
                  countryName: country.name
                })
              }
              value={number}
              defaultCountry={country}
              formatOnInit={true}
              ref="intlTelInput"
            />
            <Button type="submit" disabled={!number} loading={isLoading}>
              Continue
            </Button>
          </Field>
        </Step>
      );

    } else if (showSummary) {
      return (
        <Step {...stepProps}><strong>{number}</strong> ({countryName})</Step>
      );
    }

    return <Step {...stepProps} />;
  }
}

export default NumberStep;

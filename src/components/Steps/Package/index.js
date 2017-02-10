import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../UI/Button';
import Spinner from '../../UI/Spinner';
import Field from '../Field';
import Step from '../Step';
import AmountPicker from './AmountPicker';
import RangedAmountField from './RangedAmountField';

import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/libphonenumber.js';
import 'react-intl-tel-input/dist/main.css';

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


import {
  selectOperator,
  selectOrder,
  selectNumber,
  selectCountry,
  selectAmount,
  selectEmail
} from './../../../store';

import {
  setAmount, setNumber, setEmail, createOrder
} from '../../../actions';

class PackageStep extends Component {
  handleSubmit = () => {
    this.props.createOrder(this.props.orderOptions).then(() => this.props.onContinue())
  }

  render() {
    const {
      // Step props
      step,
      expanded,
      onBack,
      showSummary,

      // Config
      billingCurrency,
      accountBalance,
      requireAccountBalance,
      showEmailField,

      // Action
      setAmount,
      setEmail,
      setNumber,

      // Data/state
      number,
      operator,
      country,
      isLoadingOrder,
      amount,
      email,

    } = this.props;

    const stepProps = {
      step,
      title: 'Select Package',
      showSummary,
      expanded,
      onBack
    };

    if (expanded) {
      const canContinue = amount && !isLoadingOrder && (showEmailField ? email.valid : true);
      const hintText = operator.result.extraInfo || 'The selected amount will automatically be added to the target account once the payment is complete.';
      const errorText = !operator.isLoading && operator.error;
      const isRanged = operator.result && operator.result.isRanged;

      return (
        <Step {...stepProps} onSubmit={() => canContinue && this.handleSubmit()}>
          <Field
            label="Select refill package"
            hint={!operator.isLoading && hintText}
            error={errorText}
          >
            {operator.isLoading && <Spinner>Loading packages...</Spinner>}
            {!operator.isLoading &&
              <AmountPicker
                onChange={setAmount}
                selected={amount}
                billingCurrency={billingCurrency}
                accountBalance={accountBalance}
                requireAccountBalance={requireAccountBalance}
                {...operator.result}
              />
            }
          </Field>

          {isRanged &&
            <RangedAmountField
              onChange={setAmount}
              amount={amount}
              currency={operator.result.currency}
              range={operator.result.range}
            />
          }

          {!operator.result.isPinBased &&
            <Field
              className="refill-number-field"
              label="Phone number"
              error={getErrorMessage(errorText)}
              hint="The phone number to top up"
            >
              <IntlTelInput
                css={['intl-tel-input', errorText && 'refill-error']}
                utilsScript={'/libphonenumber.js'}
                onPhoneNumberChange={(status, value, country, number) => setNumber(number)}
                allowDropdown={false}
                autoComplete="phone"
                value={number}
                defaultCountry={country.alpha2.toLowerCase()}
                onlyCountries={[country.alpha2.toLowerCase()]}
                preferredCountries={[]}
                formatOnInit={true}
                ref="intlTelInput"
              />
            </Field>
          }

          {showEmailField &&
            <Field
              label="Your email address"
              hint="The email address is used to send status updates about your order"
              error={(email && email.value && email.error) ? 'Please enter a valid email' : ''}
            >
              <input type="email" name="email" size="40"
                defaultValue={email.value}
                onChange={(e) => setEmail({ value: e.target.value, inFocus: true })}
                onBlur={(e) => setEmail({ value: e.target.value, inFocus: false })}
              />
            </Field>
          }

          <Button
            type="submit"
            disabled={!canContinue}
            loading={isLoadingOrder}
            className={'button-submit'}
          >
            Continue
          </Button>
        </Step>
      );
    } else if (showSummary && operator.result) {
      return (
        <Step {...stepProps}>
          <strong>{amount} {operator.result.currency}</strong>
        </Step>
      );
    }
    return <Step {...stepProps} />;
  }
}

export default connect((state) => ({
  operator: selectOperator(state),
  isLoadingOrder: selectOrder(state).isLoading,
  number: selectNumber(state),
  country: selectCountry(state),
  amount: selectAmount(state),
  email: selectEmail(state)
}), {
  setNumber,
  setAmount,
  setEmail,
  createOrder
})(PackageStep);

import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../UI/Button';
import Spinner from '../../UI/Spinner';
import Field from '../../UI/Field';
import PhoneNumberInput from '../../UI/PhoneNumberInput';
import Step from '../Step';
import AmountPicker from './AmountPicker';
import RangedAmountField from './RangedAmountField';

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
      defaultNumber,
      operator,
      country,
      isLoadingOrder,
      orderError,
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

    const operatorResult = !operator.isLoading && operator.result;

    if (expanded) {
      const errorText = !operator.isLoading && operator.error;
      const hintText = operatorResult && operatorResult.extraInfo || 'The selected amount will automatically be added to the target account once the payment is complete.';
      const isRanged = operatorResult && operatorResult.isRanged;
      const isPinBased = operatorResult ? operatorResult.isPinBased : null;
      // const canContinue = (isPinBased || number) && amount && !isLoadingOrder && (showEmailField ? email.valid : true);
      const canContinue = number && amount && !isLoadingOrder && (showEmailField ? email : true);
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
                {...operatorResult}
              />
            }
          </Field>

          {isRanged === true &&
            <RangedAmountField
              onChange={setAmount}
              amount={amount}
              currency={operatorResult.currency}
              billingCurrency={billingCurrency}
              range={operatorResult.range}
            />
          }

          {true /*isPinBased === false*/ &&
            <PhoneNumberInput
              country={country}
              onChange={this.props.setNumber}
              defaultValue={number || defaultNumber}
              error={orderError}
            />
          }

          {showEmailField &&
            <Field
              label="Email address"
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
    } else if (showSummary && operatorResult) {
      return (
        <Step {...stepProps}>
          <strong>{amount} {operatorResult.currency}</strong>
          {!operator.isPinBased && `,  ${number}`}
        </Step>
      );
    }
    return <Step {...stepProps} />;
  }
}

export default connect((state) => ({
  operator: selectOperator(state),
  isLoadingOrder: selectOrder(state).isLoading,
  orderError: selectOrder(state).error,
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

import React, { Component } from 'react';
import { connect } from 'react-redux';

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

import { setAmount, setNumber, setEmail, createOrder } from '../../../actions';

import { formatDisplayValue } from '../../../lib/number-helpers';

const rangedCostForAmount = (conversionRate, currency, amount) => {
  let amountCost = amount * conversionRate;
  // BTC
  if (currency === 'XBT') {
    return Math.ceil(amountCost / 100) / 1000000;
  } else {
    // USD or EUR
    return Number(amountCost.toFixed(2));
  }
};

const selectValidPackage = ({ amount, maxCost, currency, packages }) => {
  const currencyAPIName = currency === 'XBT' ? 'BTC' : currency;
  const packageCostKey = currencyAPIName.toLowerCase() + 'Price';
  const packageValues = packages.map(pkg => String(pkg.value));

  // If no amount is selected, pick a package in the middle
  if (!amount) {
    const middle = Math.round((packageValues.length - 1) * 0.6);

    if (packageValues[middle]) {
      amount = packageValues[middle];
    }
  }

  // Cast amount to string if we have a value
  amount = amount ? String(amount) : amount;

  // If we have a selected package, make sure the user can afford it
  const selectedPackageIndex = packageValues.indexOf(amount);
  if (selectedPackageIndex !== -1) {
    // Use the cost (price) from the api
    const packageCost = packages[selectedPackageIndex][packageCostKey];

    // If amount is a valid package (and within limits) just return it
    if (packageCost <= maxCost) {
      return amount;
    }
  }

  // Otherwise try to pick the highest value package the user can afford
  const selectedPackage = packages
    .filter(pkg => pkg[packageCostKey] <= maxCost)
    .pop();

  if (selectedPackage) {
    return String(selectedPackage.value);
  }

  // If there are no packages the user can afford, return the amount as is
  return amount;
};

const selectValidRangedAmount = ({
  amount,
  maxCost,
  costConversionRate,
  currency
}) => {
  const selectedAmountCost = rangedCostForAmount(
    costConversionRate,
    currency,
    amount
  );

  if (selectedAmountCost <= maxCost) {
    return String(amount); // Return amount as is for ranged operators
  } else {
    if (currency === 'XBT') {
      const amountForMaxCost = Math.floor(
        maxCost * 100000000 / costConversionRate
      );
      return String(amountForMaxCost); // Return the maximum amount allowed
    } else {
      return String(maxCost / costConversionRate);
    }
  }
};

export const selectValidAmount = args => {
  const ranged = args.ranged;
  const validPackageAmount = selectValidPackage(args);

  if (ranged) {
    return selectValidRangedAmount({ ...args, amount: args.amount || validPackageAmount })
  } else {
    return validPackageAmount;
  }
};

class PackageStep extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.operator.isLoading && this.props.operator.isLoading) {
      this._selectValidAmount(nextProps, nextProps.amount);
    }
  }

  _selectValidAmount = (props, amount) => {
    const operator = props.operator && props.operator.result;

    if (operator) {
      // Always require account balance for the default value
      const requireAccountBalance = props.requireAccountBalance || !amount;

      // Default to infinity if account balance is optional
      const maxCost = requireAccountBalance
        ? props.accountBalance
        : Number.POSITIVE_INFINITY;

      const currency = props.billingCurrency;
      const packages = operator.packages;
      const ranged = operator.isRanged;
      const costConversionRate = ranged && operator.range.userPriceRate;
      amount = String(amount);

      props.setAmount(
        selectValidAmount({
          amount,
          packages,
          currency,
          maxCost,
          costConversionRate,
          ranged
        })
      );
    }
  };
  handleAmountChange = amount => {
    if (amount) {
      this._selectValidAmount(this.props, amount);
    } else {
      this._selectValidAmount(this.props, 0);
    }
  }
  handleAmountBlur = amount => this._selectValidAmount(this.props, amount || '');

  handleSubmit = () => {
    this.props
      .createOrder(this.props.orderOptions)
      .then(() => this.props.onContinue());
  };

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
      setEmail,

      // Data/state
      number,
      operator,
      country,
      isLoadingOrder,
      orderError,
      email,
      amount
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
      const hintText =
        (operatorResult && operatorResult.extraInfo) ||
        'The selected amount will automatically be added to the target account once the payment is complete.';
      const isRanged = operatorResult && operatorResult.isRanged;
      // const isPinBased = operatorResult ? operatorResult.isPinBased : null;
      // const canContinue = (isPinBased || number) && amount && !isLoadingOrder && (showEmailField ? email.valid : true);
      const canContinue =
        (number || operatorResult.noNumber) && amount && !isLoadingOrder && (showEmailField ? email : true);
      const showNumberField = operatorResult && !operatorResult.noNumber;

      return (
        <Step
          {...stepProps}
          onSubmit={() => canContinue && this.handleSubmit()}
        >
          <Field
            label="Select refill package"
            hint={!operator.isLoading && hintText}
            error={errorText}
          >
            {operator.isLoading && <Spinner>Loading packages...</Spinner>}
            {!operator.isLoading &&
              <AmountPicker
                onChange={this.handleAmountChange}
                selected={amount}
                billingCurrency={billingCurrency}
                accountBalance={accountBalance}
                requireAccountBalance={requireAccountBalance}
                {...operatorResult}
              />}
          </Field>

          {isRanged === true &&
            <RangedAmountField
              onChange={this.handleAmountChange}
              onBlur={this.handleAmountBlur}
              amount={amount}
              currency={operatorResult.currency}
              billingCurrency={billingCurrency}
              range={operatorResult.range}
            />}

          {showNumberField &&
            <PhoneNumberInput
              country={country}
              onChange={this.props.setNumber}
              defaultValue={number}
              error={orderError}
              type={operatorResult && operatorResult.type}
            />}

          {showEmailField &&
            <Field
              label="Email address"
              hint="The email address is used to send status updates about your order"
              error={
                email && email.value && email.error
                  ? 'Please enter a valid email'
                  : ''
              }
            >
              <input
                type="email"
                name="email"
                size="40"
                defaultValue={email.value}
                onChange={e =>
                  setEmail({ value: e.target.value, inFocus: true })}
                onBlur={e =>
                  setEmail({ value: e.target.value, inFocus: false })}
              />
            </Field>}

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
          {!operator.isPinBased &&
            `,  ${formatDisplayValue(
              operatorResult && operatorResult.type,
              number,
              country
            )}`}
        </Step>
      );
    }
    return <Step {...stepProps} />;
  }
}

export default connect(
  state => ({
    operator: selectOperator(state),
    isLoadingOrder: selectOrder(state).isLoading,
    orderError: selectOrder(state).error,
    number: selectNumber(state),
    country: selectCountry(state),
    amount: selectAmount(state),
    email: selectEmail(state)
  }),
  {
    setNumber,
    setAmount,
    setEmail,
    createOrder
  }
)(PackageStep);

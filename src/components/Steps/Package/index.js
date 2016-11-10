import React from 'react';
import Button from '../../UI/Button';
import Spinner from '../../UI/Spinner';
import Field from '../Field';
import Step from '../Step';
import OperatorPicker from './OperatorPicker';
import AmountPicker from './AmountPicker';
import RangedAmountField from './RangedAmountField';

const PackageStep = ({
  // Step props
  expanded,
  onContinue,
  onBack,
  showSummary,

  // Config
  billingCurrency,
  showEmailField,

  // Data/state
  numberLookup,
  autoDetectedOperator,
  isLoadingOrder,
  amount,
  email,

  // Actions
  onOperatorChange,
  onAmountChange,
  onEmailChange
}) => {
  const stepProps = {
    number: 2,
    title: "Select Package",
    showSummary,
    expanded,
    onBack
  };
  numberLookup = numberLookup || {result: {}};
  const {isLoading, result} = numberLookup;
  const { operator } = result || {};

  if (expanded) {
    const canContinue = operator && operator.packages && operator.packages.length && !isLoadingOrder && (showEmailField ? email.valid : true);
    const hintText = operator && operator.extraInfo || 'The selected amount will automatically be added to the target account once the payment is complete.';
    const errorText = operator && !isLoading ? numberLookup.error || result.message : '';
    const isRanged = !isLoading && operator && operator.isRanged;

    return (
      <Step {...stepProps} onSubmit={() => canContinue && onContinue()}>
        <Field label="Select your operator">
          <OperatorPicker onChange={onOperatorChange} autoDetectedOperator={autoDetectedOperator} {...result} />
        </Field>

        {(operator || isLoading) &&
          <Field
            label="Select refill package"
            hint={!isLoading && hintText}
            error={errorText}
          >
            {isLoading && <Spinner>Loading packages...</Spinner>}
            {!isLoading &&
              <AmountPicker
                onChange={onAmountChange}
                selected={amount}
                billingCurrency={billingCurrency}
                {...operator}
              />
            }
          </Field>
        }

        {isRanged &&
          <RangedAmountField
            onChange={onAmountChange}
            amount={amount}
            currency={operator.currency}
            range={operator.range}
          />
        }

        {(operator && showEmailField) &&
          <Field
            label="Your email address"
            hint="The email address is used to send status updates about your order"
            error={(email && email.value && email.error) ? 'Please enter a valid email' : ''}
          >
            <input type="email" name="email" size="40"
              defaultValue={email.value}
              onChange={(e) => onEmailChange({ value: e.target.value, inFocus: true })}
              onBlur={(e) => onEmailChange({ value: e.target.value, inFocus: false })}
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
  } else if (showSummary && operator) {
    return (
      <Step {...stepProps}>
        <strong>{operator.name}</strong>, {amount} {operator.currency}
      </Step>
    );
  }
  return <Step {...stepProps} />;
};

export default PackageStep;

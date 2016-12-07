import React from 'react';
import {connect} from 'react-redux';

import NumberStep from './Steps/Number';
import PackageStep from './Steps/Package';
import OrderStep from './Steps/Order';

import {
  setRefillNumber,
  setRefillAmount,
  setRefillEmail,
  setRefillStep,
  lookupRefillNumber,
  placeRefillOrder,
  updatePaymentStatus
} from '../actions';
import {
  selectUiState,
  selectCurrentStep,
  selectNumberLookup,
  selectPaymentStatus,
  selectOrder
} from '../store';

import './Widget.scss';

const NewRefill = ({
  /* State */
  currentStep,
  numberLookup,
  paymentStatus,
  order,
  widgetState,

  /* Actions */
  onNumberChange,
  onSubmitNumberStep,
  onOperatorChange,
  onAmountChange,
  onEmailChange,
  onSubmitPackageStep,
  goToRefillStep,
  onPaymentStatusChange,

  /* Other props */
  paymentButtons,
  showBTCAddress,
  billingCurrency,
  orderOptions,
  showIntroduction,
  showTerms,

  ...rest
}) => {
  const showEmailField = !('email' in orderOptions) || orderOptions.email.indexOf('@') < 1;
  const refundAddress = orderOptions.refundAddress;

  // Only show BTC payment info if explicitly enabled or if the billing
  // currency is BTC and it is not explicitly disabled
  showBTCAddress = showBTCAddress !== null ? showBTCAddress :
    billingCurrency === 'BTC';

  const sharedProps = {
    country: widgetState.country,
    countryName: widgetState.countryName,
    number: widgetState.number,
    formattedNumber: widgetState.formattedNumber,
    amount: widgetState.amount,
    showEmailField: showEmailField,
    billingCurrency: (billingCurrency || 'xbt').toUpperCase(),
    numberLookup
  };

  return (
    <div {...rest}>
      <NumberStep
        expanded={currentStep===1}
        showSummary={currentStep > 1}
        onNumberChange={onNumberChange}
        onContinue={onSubmitNumberStep}
        onBack={()=>goToRefillStep(1)}
        {...sharedProps}
      />
      <PackageStep
        expanded={currentStep===2}
        showSummary={currentStep > 2}
        email={widgetState.email}
        onEmailChange={onEmailChange}
        autoDetectedOperator={widgetState.autoDetectedOperator}
        onOperatorChange={onOperatorChange}
        onAmountChange={onAmountChange}
        onContinue={()=>onSubmitPackageStep(orderOptions)}
        onBack={()=>goToRefillStep(2)}
        isLoadingOrder={order && order.isLoading}
        {...sharedProps}
      />
      <OrderStep
        expanded={currentStep===3}
        order={!order.isLoading && order.result}
        paymentStatus={paymentStatus}
        paymentButtons={paymentButtons}
        showBTCAddress={showBTCAddress}
        onPaymentStatusChange={onPaymentStatusChange}
        refundAddress={refundAddress}
        {...sharedProps}
      />
      {showIntroduction === true ?
        <p className="refill-introduction">With <strong>Bitrefill</strong> you can top up prepaid phones in over 150 countries. It’s fast, cheap and secure.</p>
      : null}
      {showTerms === true ?
        <p className="refill-terms">
          <a href="https://www.bitrefill.com/terms/" target="_blank">
            Terms of Service
          </a> and <a href="https://www.bitrefill.com/privacy/" target="_blank">
            Privacy Policy
          </a>
        </p>
      : null}
    </div>
  );
};


export default connect(state => ({
  widgetState: selectUiState(state),
  currentStep: selectCurrentStep(state),
  numberLookup: selectNumberLookup(state),
  paymentStatus: selectPaymentStatus(state),
  order: selectOrder(state)
}), {
  onNumberChange: setRefillNumber,
  onSubmitNumberStep: lookupRefillNumber,
  onOperatorChange: lookupRefillNumber,
  onAmountChange: setRefillAmount,
  onEmailChange: setRefillEmail,
  onSubmitPackageStep: placeRefillOrder,
  onPaymentStatusChange: updatePaymentStatus,
  goToRefillStep: setRefillStep
})(NewRefill);

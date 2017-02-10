import React, {Component} from 'react';
import {connect} from 'react-redux';

import CountryStep from './Steps/Country';
import OperatorStep from './Steps/Operator';
import PackageStep from './Steps/Package';
import OrderStep from './Steps/Order';

import {setStep, updateOrderStatus, loadInventory} from '../actions';
import {selectCurrentStep} from '../store';

import './Widget.scss';

const steps = [{
  component: CountryStep
},{
  component: OperatorStep
},{
  component: PackageStep
},{
  component: OrderStep
}];

class AirfillWidget extends Component {
  componentDidMount() {
    this.props.loadInventory();
    this.props.updateOrderStatus();
  }

  renderSteps() {
    const {
      currentStep,
      setStep,

      // Config options
      paymentButtons,
      accountBalance=Number.POSITIVE_INFINITY,
      requireAccountBalance=false,
      showBTCAddress=this.props.billingCurrency === 'XBT',
      billingCurrency='XBT',
      orderOptions,
      showIntroduction=false,
      showTerms=false,

      ...rest
    } = this.props;

    const showEmailField = !('email' in orderOptions) || orderOptions.email.indexOf('@') < 1;

    return steps.map(({component, options}, i) => {
      const Component = component;
      const step = i + 1;

      if (currentStep < step) { return null; }

      return <Component
        key={step}
        step={step}
        expanded={currentStep===step}
        showSummary={currentStep > step}
        onContinue={()=>setStep(step + 1)}
        onBack={()=>setStep(step)}

        paymentButtons={paymentButtons}
        showBTCAddress={showBTCAddress}
        orderOptions={orderOptions}
        billingCurrency={billingCurrency}
        accountBalance={accountBalance}
        requireAccountBalance={requireAccountBalance}
        showEmailField={showEmailField}
      />;
    })
  }

  renderFooter() {
    if (!this.props.showFooter) { return null; }
    return (
      <p className="refill-terms">
        <a href="https://www.bitrefill.com/terms/" target="_blank">
          Terms of Service
        </a> and <a href="https://www.bitrefill.com/privacy/" target="_blank">
          Privacy Policy
        </a>
      </p>
    )
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderSteps()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default connect(state => ({
  currentStep: selectCurrentStep(state)
}), {
  setStep,
  updateOrderStatus,
  loadInventory
})(AirfillWidget);

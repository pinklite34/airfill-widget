import React, {Component} from 'react';
import {connect} from 'react-redux';

import Container from './UI/Container';

import CountryStep from './Steps/Country';
import OperatorStep from './Steps/Operator';
import PackageStep from './Steps/Package';
import OrderStep from './Steps/Order';

import {setStep, updateOrderStatus, loadInventory, lookupLocation} from '../actions';
import {selectCurrentStep} from '../store';

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
    this.props.lookupLocation();
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
      orderOptions={},
      defaultNumber
    } = this.props;

    const showEmailField = !orderOptions.email || orderOptions.email.indexOf('@') < 1;

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
        onReset={()=>setStep(1)}

        paymentButtons={paymentButtons}
        showBTCAddress={showBTCAddress}
        orderOptions={orderOptions}
        billingCurrency={billingCurrency}
        accountBalance={accountBalance}
        requireAccountBalance={requireAccountBalance}
        showEmailField={showEmailField}
        defaultNumber={defaultNumber}
      />;
    })
  }

  renderFooter() {
    if (!this.props.showTerms) { return null; }
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

  renderIntroduction() {
    if (!this.props.showIntroduction) { return null; }
    return (
      <p className="refill-introduction">With <strong>Bitrefill</strong> you can top up prepaid phones in over 150 countries. It’s fast, cheap and secure.</p>
    )
  }

  render() {
    return (
      <Container className={this.props.className}>
        {this.renderSteps()}
        {this.renderIntroduction()}
        {this.renderFooter()}
      </Container>
    );
  }
}

export default connect(state => ({
  currentStep: selectCurrentStep(state)
}), {
  setStep,
  updateOrderStatus,
  loadInventory,
  lookupLocation
})(AirfillWidget);

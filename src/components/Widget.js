import React, {Component} from 'react';
import {connect} from 'react-redux';

import Container from './UI/Container';

import CountryStep from './Steps/Country';
import OperatorStep from './Steps/Operator';
import PackageStep from './Steps/Package';
import OrderStep from './Steps/Order';

import {init, setStep} from '../actions';
import {selectCurrentStep, selectRecentNumbers} from '../store';

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
    this.props.init({
      defaultNumber: this.props.defaultNumber
    });
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
      refillHistory=null,
      recentNumbers
    } = this.props;

    const showEmailField = !orderOptions.email || orderOptions.email.indexOf('@') < 1;

    const history = refillHistory
      ? refillHistory
      : recentNumbers.length ? recentNumbers : null;

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
        refillHistory={history}
      />;
    })
  }

  renderFooter() {
    if (!this.props.showTerms) { return null; }
    return (
      <p className="refill-terms">
        <a href="https://www.bitrefill.com/terms/" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a> and <a href="https://www.bitrefill.com/privacy/" target="_blank" rel="noopener noreferrer">
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
  currentStep: selectCurrentStep(state),
  recentNumbers: selectRecentNumbers(state)
}), {
  init,
  setStep
})(AirfillWidget);

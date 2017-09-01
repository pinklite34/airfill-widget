import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';

import { Card } from 'react-toolbox/lib/card';

import { init } from '../actions';

import Root from './UI/Root';
// import Container from './UI/Container';

import Header from './Header';
import Footer from './Footer';

import Country from './Country';
import Providers from './Providers';
import Instructions from './Instructions';
import Amounts from './Amounts';

// import CountryStep from './Steps/Country';
// import OperatorStep from './Steps/Operator';
// import PackageStep from './Steps/Package';
// import OrderStep from './Steps/Order';

// import {init, setStep} from '../actions';
// import {selectCurrentStep, selectRecentNumbers} from '../store';

// const steps = [{
//   component: CountryStep
// },{
//   component: OperatorStep
// },{
//   component: PackageStep
// },{
//   component: OrderStep
// }];

class AirfillWidget extends Component {
  componentDidMount() {
    this.props.init({
      defaultNumber: this.props.defaultNumber
    });
  }

  // renderSteps() {
  //   const {
  //     currentStep,
  //     setStep,

  //     // Config options
  //     paymentButtons,
  //     accountBalance=Number.POSITIVE_INFINITY,
  //     requireAccountBalance=false,
  //     showBTCAddress=this.props.billingCurrency === 'XBT',
  //     billingCurrency='XBT',
  //     orderOptions={},
  //     refillHistory=null,
  //     recentNumbers
  //   } = this.props;

  //   const showEmailField = !orderOptions.email || orderOptions.email.indexOf('@') < 1;

  //   const history = refillHistory
  //     ? refillHistory
  //     : recentNumbers.length ? recentNumbers : null;

  //   return steps.map(({component, options}, i) => {
  //     const Component = component;
  //     const step = i + 1;

  //     if (currentStep < step) { return null; }

  //     return <Component
  //       key={step}
  //       step={step}
  //       expanded={currentStep===step}
  //       showSummary={currentStep > step}
  //       onContinue={()=>setStep(step + 1)}
  //       onBack={()=>setStep(step)}
  //       onReset={()=>setStep(1)}

  //       paymentButtons={paymentButtons}
  //       showBTCAddress={showBTCAddress}
  //       orderOptions={orderOptions}
  //       billingCurrency={billingCurrency}
  //       accountBalance={accountBalance}
  //       requireAccountBalance={requireAccountBalance}
  //       showEmailField={showEmailField}
  //       refillHistory={history}
  //     />;
  //   })
  // }

  render() {
    return (
      <Root className={this.props.className}>
        <Route
          render={({ location }) => {
            console.log('Changing to route', location.pathname);
            return null;
          }}
        />
        <Card>
          <Header branded />
          <Country />
          <Providers />
          <Amounts />
          <Instructions />
        </Card>
        <Footer branded />
      </Root>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      // currentStep: selectCurrentStep(state),
      // recentNumbers: selectRecentNumbers(state)
    }),
    {
      init
    }
  )(AirfillWidget)
);
// export default AirfillWidget;

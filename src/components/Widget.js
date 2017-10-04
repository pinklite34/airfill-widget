import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';

import { Card } from 'react-toolbox/lib/card';

import { init } from '../actions';
import { selectInventory } from '../store';

import SpinnerWhileLoading from './UI/SpinnerWhileLoading';
import Root from './UI/Root';

import Header from './Header';
import Footer from './Footer';

import Country from './Country';
import Providers from './Providers';
import Instructions from './Instructions';
import Amount from './Amount';
import Order from './Order';
import Details from './Details';

class AirfillWidget extends Component {
  static defaultProps = {
    userAccountBalance: Number.POSITIVE_INFINITY,
    requireAccountBalance: false,
    billingCurrency: 'XBT'
  };

  componentDidMount() {
    this.props.init({
      defaultNumber: this.props.defaultNumber,
      email: this.props.orderOptions.email
    });
  }

  // renderSteps() {
  //   const {
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
    const config = this.props;

    return (
      <MemoryRouter>
        <Root className={this.props.className}>
          <Route
            render={({ location }) => {
              console.log('Changing to route', location.pathname);
              return null;
            }}
          />
          <Card>
            <SpinnerWhileLoading hasLoaded={!!this.props.inventory.result}>
              <Header branded />
              <Country />
              <Providers />
              <Amount config={config} />
              <Details config={config} />
              <Order config={config} />
              <Route
                path="/"
                exact
                render={() => <Instructions config={config} />}
              />
            </SpinnerWhileLoading>
          </Card>
          <Footer branded />
        </Root>
      </MemoryRouter>
    );
  }
}

export default connect(
  state => ({
    // recentNumbers: selectRecentNumbers(state)
    inventory: selectInventory(state)
  }),
  {
    init
  }
)(AirfillWidget);

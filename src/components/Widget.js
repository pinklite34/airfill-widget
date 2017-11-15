import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { css } from 'glamor';

import { Card } from 'react-toolbox/lib/card';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';

import { init } from '../actions';
import { selectInventory } from '../store';

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
  static propTypes = {
    // User data
    defaultNumber: PropTypes.string,
    userAccountBalance: PropTypes.number,
    userEmail: PropTypes.string,

    // Payment options
    paymentButtons: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired,
        requireAccountBalance: PropTypes.bool
      })
    ).isRequired,
    showBTCAddress: PropTypes.bool,
    billingCurrency: PropTypes.string,
    requireAccountBalance: PropTypes.bool,

    // Receipt
    sendEmail: PropTypes.bool,
    sendSMS: PropTypes.bool,

    // Widget appearance
    showInstructions: PropTypes.bool,
    showLogo: PropTypes.bool,
    showPoweredBy: PropTypes.bool,
    showFooter: PropTypes.bool,

    // Refill history
    refillHistory: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.string,
        operator: PropTypes.string
      })
    )
  };

  static defaultProps = {
    defaultNumber: '',
    userAccountBalance: Number.POSITIVE_INFINITY,
    userEmail: null,

    paymentButtons: [],
    showBTCAddress: false,
    billingCurrency: 'XBT',
    requireAccountBalance: false,

    sendEmail: true,
    sendSMS: true,

    showInstructions: true,
    showLogo: true,
    showPoweredBy: false,
    showFooter: true,

    refillHistory: []
  };

  componentDidMount() {
    this.props.init({
      defaultNumber: this.props.defaultNumber,
      email: this.props.orderOptions.email
    });
  }

  render() {
    const config = this.props;
    const hasLoaded = !!this.props.inventory.result;

    return (
      <Root className={this.props.className}>
        {hasLoaded ? (
          <Card>
            <Header branded={config.showLogo} />
            <Country />
            <Providers />
            <Amount config={config} />
            <Details config={config} />
            <Order config={config} />
            {config.showInstructions && (
              <Route
                path="/"
                exact
                render={() => <Instructions config={config} />}
              />
            )}
          </Card>
        ) : (
          <Card>
            <div
              {...css({
                display: 'flex',
                justifyContent: 'center',
                margin: 64
              })}
            >
              <ProgressBar type="circular" />
            </div>
          </Card>
        )}

        {config.showFooter && <Footer branded={config.showPoweredBy} />}
      </Root>
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

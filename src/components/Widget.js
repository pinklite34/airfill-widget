import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { css } from 'glamor';

import Card from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import blue from 'material-ui/colors/blue';

import { init } from '../actions';
import { selectInventory } from '../store';

import Root from './UI/Root';

import Header from './Header';
import Footer from './Footer';

import Country from './Country';
import NumberLookup from './NumberLookup';
import Providers from './Providers';
import Instructions from './Instructions';
import Amount from './Amount';
import Order from './Order';
import Details from './Details';


const theme = createMuiTheme({
  palette: {
    primary: blue,
  }
});

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
      <MuiThemeProvider theme={theme}>
        <Root className={this.props.className}>
          {hasLoaded ? (
            <Card>
              <Header branded={config.showLogo} />
              <Country />
              <NumberLookup />
              <Providers />
              <Amount config={config} />
              <Details config={config} />
              <Order config={config} />
              {config.showInstructions && (
                <Route
                  path="/refill"
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
                <CircularProgress />
              </div>
            </Card>
          )}

          {config.showFooter && <Footer branded={config.showPoweredBy} />}
        </Root>
      </MuiThemeProvider>
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

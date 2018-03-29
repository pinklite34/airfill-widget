import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { css } from 'glamor';

import { init } from '../actions';
import { configProps, inventoryProp, fnProp } from '../lib/prop-types';
import { selectInventory } from '../store';

import Card from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import blue from 'material-ui/colors/blue';

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
import getMethods from '../payment-methods';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class AirfillWidget extends Component {
  static propTypes = {
    init: fnProp,
    inventory: inventoryProp,
    className: PropTypes.string,
    ...configProps,
  };

  static defaultProps = {
    defaultNumber: '',
    userEmail: null,

    showBTCAddress: false,
    billingCurrency: 'XBT',
    requireAccountBalance: false,

    sendEmail: true,
    sendSMS: true,

    showInstructions: true,
    showLogo: true,
    showPoweredBy: false,
    showFooter: true,

    refillHistory: [],
  };

  constructor(props) {
    super(props);

    const { paymentButtons } = props;

    if (props.keepDefaultPayments) {
      paymentButtons.push(...getMethods(props));
    }

    this.state = {
      paymentButtons,
    };
  }

  componentWillMount() {
    const { isMobile, init, defaultNumber } = this.props;

    init({
      defaultNumber: defaultNumber,
      shouldLookupLocation: !isMobile,
    });
  }

  componentDidCatch(err, info) {
    console.error('widget', err);
    console.error('widget', info);
  }

  render() {
    const {
      className,
      showLogo,
      showInstructions,
      showFooter,
      showPoweredBy,
      inventory,
      isMobile,
    } = this.props;

    const config = {
      ...this.props,
      ...this.state,
    };

    const hasLoaded = !!inventory.result;

    return (
      <MuiThemeProvider theme={theme}>
        <Root className={className}>
          {hasLoaded ? (
            <Card>
              <Header isMobile={isMobile} branded={showLogo} />
              <Country />
              <NumberLookup />
              <Providers />
              <Amount config={config} />
              <Details config={config} />
              <Order config={config} />
              {showInstructions && (
                <Route
                  path="/refill"
                  exact
                  render={() => <Instructions config={config} />}
                />
              )}
            </Card>
          ) : (
            <div
              {...css({
                display: 'flex',
                justifyContent: 'center',
                margin: 64,
              })}
            >
              <CircularProgress />
            </div>
          )}

          {showFooter && <Footer branded={showPoweredBy} />}
        </Root>
      </MuiThemeProvider>
    );
  }
}

function AirfillWidgetWrapper(props) {
  return (
    <Media query="(-moz-touch-enabled: 1), (pointer: coarse)">
      {isMobile => <AirfillWidget isMobile={isMobile} {...props} />}
    </Media>
  );
}

export default connect(
  state => ({
    // recentNumbers: selectRecentNumbers(state)
    inventory: selectInventory(state),
  }),
  {
    init,
  }
)(AirfillWidgetWrapper);

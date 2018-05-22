import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';
import { compose } from 'recompose';

import { init, setOperator, setCountry } from '../actions';
import { configProps, inventoryProp, fnProp } from '../lib/prop-types';
import { selectInventory } from '../store';

import Card from './UI/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import blue from 'material-ui/colors/blue';

import Root from './UI/Root';
import Header from './Header';
import Footer from './Footer';
import Country from './Country';
import Providers from './Providers';
import Instructions from './Instructions';
import Amount from './Amount';
import Order from './Order';
import Recipient from './Recipient';
import Payment from './PaymentMethod';
import getMethods from '../payment-methods';
import Spinner from './UI/Spinner';
import { restClient } from '..';
import { client } from '../lib/api-client';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class AirfillWidget extends Component {
  static propTypes = {
    init: fnProp,
    setOperator: PropTypes.func.isRequired,
    setCountry: PropTypes.func.isRequired,
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
    const {
      key,
      baseUrl,
      isMobile,
      init,
      defaultNumber,
      setOperator,
      setCountry,
      operator,
      country,
      history,
    } = this.props;

    client.configure({
      token: key || '5GY9TZBK8E05U9JQSTWFXNQS4',
      baseUrl: baseUrl || 'https://api.bitrefill.com/widget',
    });

    if (country) {
      setCountry(country);

      if (!operator) {
        history.push('/refill/selectProvider');
      }
    }

    if (operator) {
      setOperator(operator);
      history.push('/refill/selectAmount');
    }

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
          <Card>
            {hasLoaded ? (
              <Fragment>
              <Header isMobile={isMobile} branded={showLogo} />
              <Country />
              <NumberLookup />
              <Providers />
              <Amount config={config} />
              <Recipient config={config} />
              <Payment config={config} />
              <Order config={config} />
              {showInstructions && (
                <Route
                  path="/refill"
                  exact
                  render={() => <Instructions config={config} />}
                />
              )}
              </Fragment>
            ) : (
              <Spinner />
            )}
          </Card>
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

export default compose(
  connect(
    state => ({
      inventory: selectInventory(state),
    }),
    {
      init,
      setOperator,
      setCountry,
    }
  ),
  withRouter
)(AirfillWidgetWrapper);

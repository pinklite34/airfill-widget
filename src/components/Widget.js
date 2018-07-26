import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { connect, Provider } from 'react-redux';
import { Route, withRouter } from 'react-router';
import { compose } from 'recompose';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'emotion-theming';
import createHistory from 'history/createMemoryHistory';
import {
  routerReducer,
  routerMiddleware,
  ConnectedRouter,
} from 'react-router-redux';

import { init, setOperator, useRecentRefill, getOrder } from '../actions';
import { injectGlobal } from 'emotion';

import { configProps, inventoryProp, fnProp } from '../lib/prop-types';
import { selectInventory } from '../store';
import configureStore from '../store/configureStore';

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
import StatusEmail from './StatusEmail';
import Payment from './PaymentMethod';
import getMethods from '../payment-methods';
import Spinner from './UI/Spinner';
import { client } from '../lib/api-client';
import i18n from '../lib/i18n';
import theme from '../theme';

const muiTheme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

injectGlobal`
  * {
    box-sizing: border-box;
  }
`;

class AirfillWidget extends Component {
  static propTypes = {
    init: fnProp,
    setOperator: PropTypes.func.isRequired,
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

  UNSAFE_componentWillMount() { // eslint-disable-line
    const {
      key,
      baseUrl,
      orderId,
      loadOrder,
      init,
      defaultNumber,
      setOperator,
      operator,
      history,
      repeatOrder,
      useRecentRefill,
    } = this.props;

    client.configure({
      token: key || '5GY9TZBK8E05U9JQSTWFXNQS4',
      baseUrl: baseUrl || 'https://api.bitrefill.com/widget',
    });

    history.push('/refill');

    if (operator) {
      setOperator(operator);
      history.push('/refill/selectAmount');
    }

    if (orderId) {
      loadOrder()
        .then(e => history.push('/refill/payment'))
        .catch(x => console.error(x));
    }

    if (repeatOrder) {
      useRecentRefill(repeatOrder);
    } else {
      init({ defaultNumber });
    }
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
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={muiTheme}>
            <Root className={className}>
              <Card alwaysBorder style={{ overflow: 'hidden' }}>
                {hasLoaded ? (
                  <Fragment>
                    <Header
                      config={config}
                      isMobile={isMobile}
                      branded={showLogo}
                    />
                    <Country />
                    <Providers />
                    <Amount config={config} />
                    <Recipient config={config} />
                    <StatusEmail config={config} />
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
        </ThemeProvider>
      </I18nextProvider>
    );
  }
}

export const history = createHistory();
const middleware = routerMiddleware(history);
const store = configureStore(routerReducer, middleware);

const StoreWidgetWrapper = compose(
  connect(
    state => ({
      inventory: selectInventory(state),
    }),
    (dispatch, b) => ({
      init,
      setOperator,
      useRecentRefill,
      loadOrder: () => dispatch(getOrder(b.orderId)),
    })
  ),
  withRouter
)(AirfillWidget);

export default function Widget(props) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Media query="(-moz-touch-enabled: 1), (pointer: coarse)">
          {isMobile => <StoreWidgetWrapper isMobile={isMobile} {...props} />}
        </Media>
      </ConnectedRouter>
    </Provider>
  );
}

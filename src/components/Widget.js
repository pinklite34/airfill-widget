import { injectGlobal } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import createHistory from 'history/createMemoryHistory';
import blue from 'material-ui/colors/blue';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { I18nextProvider } from 'react-i18next';
import Media from 'react-media';
import { connect, Provider } from 'react-redux';
import { Route, withRouter } from 'react-router';
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from 'react-router-redux';
import { compose } from 'recompose';

import {
  init,
  loadOrder,
  openComboInput,
  setComboInputFocus,
  setCountry,
  setOperator,
  useRecentRefill,
} from '../actions';
import { client } from '../lib/api-client';
import i18n from '../lib/i18n-instance';
import { configProps, fnProp, inventoryProp } from '../lib/prop-types';
import WidgetRect from '../lib/WidgetRect';
import getMethods from '../payment-methods';
import { selectInventory, selectOperator, selectOrder } from '../store';
import configureStore from '../store/configureStore';
import theme from '../theme';
import Amount from './Amount';
import Country from './Country';
import Footer from './Footer';
import Header from './Header';
import Instructions from './Instructions';
import Order from './Order';
import Payment from './PaymentMethod';
import Providers from './Providers';
import Recipient from './Recipient';
import StatusEmail from './StatusEmail';
import Card from './UI/Card';
import Root from './UI/Root';
import Spinner from './UI/Spinner';

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

    this.state = {
      paymentButtons,
    };
  }

  componentDidMount() {
    const {
      apiKey,
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
      openDropdown,
    } = this.props;

    client.configure({
      token: apiKey || '5GY9TZBK8E05U9JQSTWFXNQS4',
      baseUrl: baseUrl || 'https://api.bitrefill.com/widget',
    });

    init({
      defaultNumber,
      shouldLookupLocation: !repeatOrder && !openDropdown,
    });

    let route = '/refill';

    if (operator) {
      setOperator(operator);
      route = '/refill/selectAmount';
    }

    if (orderId) {
      loadOrder().catch(x => console.error(x));
    }

    if (repeatOrder) {
      useRecentRefill(repeatOrder);
    }

    history.push(route);
  }

  componentDidUpdate(prevProps) {
    const { selectedOperator, onChange, order } = this.props;

    if (onChange) {
      const prevOperator =
        prevProps.selectedOperator && prevProps.selectedOperator.result;
      const currOperator = selectedOperator && selectedOperator.result;

      if (
        (currOperator && !prevOperator) ||
        (currOperator && prevOperator.slug !== currOperator.slug)
      ) {
        onChange({
          operator: currOperator.slug,
        });
      }

      const prevOrder = prevProps.order && prevProps.order.result;
      const currOrder = order && order.result;

      if (
        (currOrder && !prevOrder) ||
        (currOrder && prevOrder.id !== currOrder.id)
      ) {
        onChange({
          orderId: currOrder.id,
        });
      }
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
              <WidgetRect>
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
              </WidgetRect>

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
      selectedOperator: selectOperator(state),
      order: selectOrder(state),
    }),
    (dispatch, props) => {
      const paymentButtons = props.paymentButtons || [];
      if (props.keepDefaultPayments) {
        paymentButtons.push(...getMethods());
      }

      if (props.openDropdown) {
        dispatch(setCountry(''));
        dispatch(openComboInput());
        dispatch(setComboInputFocus(true));
      }

      return {
        init: c => dispatch(init(c)),
        setOperator: operator => dispatch(setOperator(operator)),
        useRecentRefill: order => dispatch(useRecentRefill(order)),
        loadOrder: () => dispatch(loadOrder(props.orderId, paymentButtons)),
      };
    }
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

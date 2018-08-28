import { injectGlobal } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import createHistory from 'history/createMemoryHistory';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import Media from 'react-media';
import { connect, Provider } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from 'react-router-redux';

import getMethods from '../payment-methods';
import { selectInventory, selectOperator, selectOrder } from '../store';
import configureStore from '../store/configureStore';
import theme from '../theme';
import { Config, Inventory, Operator } from '../types';

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
import WidgetRect from '../lib/WidgetRect';

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

/* tslint:disable */
injectGlobal`
  * {
    box-sizing: border-box;
  }
`;
/* tslint:enable */

interface AirfillWidgetProps extends RouteComponentProps<{}> {
  init: typeof init;
  setOperator: (operator: string) => Promise<Operator>;
  inventory: Inventory;
  className: string;

  apiKey?: string;
  baseUrl?: string;
  orderId?: string;
  operator?: string;
  repeatOrder?: string;

  useRecentRefill: typeof useRecentRefill;
  loadOrder: () => Promise<any>;
  openDropdown: boolean;
  onChange?: ({ operator: Operator, order: Order }) => void;
}

class AirfillWidget extends React.Component<AirfillWidgetProps & Config> {
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
      token: apiKey || 'hMY0TozyGOWKfSkV',
      baseUrl: baseUrl || 'https://api.bitrefill.com/widget',
    });

    init({
      defaultNumber,
      shouldLookupLocation: !repeatOrder && !openDropdown,
    });

    if (operator) {
      setOperator(operator)
        .then(e => history.push('/refill/selectAmount'))
        .catch(e => console.log('error', e));
    }

    if (orderId) {
      loadOrder().catch(x => console.error(x));
    }

    if (repeatOrder) {
      useRecentRefill(repeatOrder);
    }

    history.push('/refill');
  }

  componentDidUpdate(prevProps) {
    const { onChange } = this.props;

    if (onChange) {
      const operator = this.getResultProp(
        prevProps,
        'selectedOperator',
        'slug'
      );

      const order = this.getResultProp(prevProps, 'order', 'id');

      onChange({
        operator,
        order,
      });
    }
  }

  componentDidCatch(err, info) {
    console.error('widget', err);
    console.error('widget', info);
  }

  getResultProp = (prevProps, toCompare, toCompare2) => {
    const prev = prevProps[toCompare] && prevProps[toCompare].result;
    const curr = this.props[toCompare] && this.props[toCompare].result;

    if ((curr && !prev) || (curr && prev[toCompare2] !== curr[toCompare2])) {
      return this.props[toCompare].result;
    }
  };

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
          <Root className={className}>
            <WidgetRect>
              <Card alwaysBorder style={{ overflow: 'hidden' }}>
                {hasLoaded ? (
                  <React.Fragment>
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
                        render={() => <Instructions />}
                      />
                    )}
                  </React.Fragment>
                ) : (
                  <Spinner />
                )}
              </Card>
            </WidgetRect>

            {showFooter && <Footer branded={showPoweredBy} />}
          </Root>
        </ThemeProvider>
      </I18nextProvider>
    );
  }
}

export const history = createHistory();
const middleware = routerMiddleware(history);
const store = configureStore(routerReducer, middleware);

const StoreWidgetWrapper = connect(
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
)(withRouter(AirfillWidget));

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

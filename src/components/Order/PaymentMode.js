import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createOrder, setPaymentMethod } from '../../actions';

import { selectAmount, selectPaymentMethod } from '../../store';

import { css } from 'glamor';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';

import BitcoinAddress from '../UI/BitcoinAddress';
import Info from './info.svg';
import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';

import QrCode from '../UI/QrCode';

import PaymentMenu from './PaymentMenu';

import {
  canAfford,
  isDirectPayment,
  isLightningPayment,
} from '../../lib/currency-helpers';
import setClipboardText from '../../lib/clipboard-helper';
import {
  orderProp,
  paymentsProp,
  orderOptionsProp,
  amountProp,
  paymentStatusProp,
  fnProp,
} from '../../lib/prop-types';

const styles = {
  list: css({
    display: 'block',
    '> dt': {
      float: 'left',
      textAlign: 'right',
      width: 120,
      fontWeight: 500,
      marginRight: '24px',
    },
    '> dd': {
      marginBottom: 8,
    },

    '@media(max-width: 480px)': {
      '> dt': {
        width: 'auto',
      },
      '> dd': {
        textAlign: 'right',
      },
    },
  }),
  paymentMethods: css({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  }),
  buttonGroup: css({
    margin: -8,
  }),
  button: css({
    margin: 8,
  }),
  package: css({
    fontSize: 16,
    color: '#323232',
    fontWeight: '500',
  }),
  changeButton: css({
    color: '#3e8fe4 !important',
    fontWeight: '500 !important',
    marginLeft: '12px',
  }),
  container: css({
    display: 'flex',
    width: '100%',
    flexDirection: 'row',

    '@media(max-width: 720px)': {
      flexDirection: 'column',
    },
  }),
  left: css({
    flex: '0 0 70%',
    '@media(max-width: 460px)': {
      paddingRight: '48px',
    },
  }),
  right: css({
    flex: '0 0 28%',
    marginLeft: 'auto',
    '& img': {
      width: '90%',
    },
    '@media(max-width: 720px)': {
      marginLeft: 0,
      '& img': {
        paddingTop: '24px',
        width: '50%',
      },
    },
  }),
  partialWarning: css({
    borderRadius: 4,
    padding: 12,
    background: '#ffdfdf',
    marginBottom: 24,
  }),
  help: css({
    textDecoration: 'none',
    color: '#3e8fe4',
    padding: 12,
  }),
};

class PaymentMode extends PureComponent {
  static propTypes = {
    order: orderProp,
    showBTCAddress: PropTypes.bool,
    paymentButtons: paymentsProp,
    amount: amountProp,
    accountBalance: amountProp,
    orderOptions: orderOptionsProp,
    paymentStatus: paymentStatusProp,
    createOrder: fnProp,
    paymentMethod: PropTypes.string,
    setPaymentMethod: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // pick first affordable payment method
    const methods = props.paymentButtons.filter(btn =>
      canAfford({
        amount: props.amount,
        btcPrice: Number(props.order.btcPrice),
        accountBalance: props.accountBalance,
        paymentMode: btn.paymentMode,
        requireAccountBalance: btn.requireAccountBalance,
      })
    );

    const method =
      methods.find(btn => btn.paymentMode === this.props.paymentMethod) ||
      methods[0];

    this.state = {
      open: false,
      paymentMethod: method,
      isLoading: false,
      order: props.order,
      orders: {
        [method.paymentMode]: props.order,
      },
      addressTooltip: false,
      amountTooltip: false,
    };
  }

  // cache the order
  componentWillReceiveProps(newProps) {
    if (newProps.order.id !== this.props.order.id) {
      this.setState(prevState => {
        const orders = prevState.orders;
        orders[this.state.paymentMethod.paymentMode] = newProps.order;

        return {
          order: newProps.order,
          orders,
        };
      });
    }
  }

  openMenu = () =>
    this.setState({
      open: true,
    });

  closeMenu = () =>
    this.setState({
      open: false,
    });

  menuClick = button => {
    // if callback is set, then it's an old payment button
    // keep this for backwards compability
    if (button.callback) {
      button.paymentModeOptions = {
        title: button.title,
        callback: button.callback,
      };
    }

    this.setState({
      open: false,
      paymentMethod: button,
      isLoading: true,
    });

    // If we already have a cached order for this method, use it
    if (button.paymentMode in this.state.orders) {
      this.setState({
        order: this.state.orders[button.paymentMode],
        isLoading: false,
      });

      return;
    }

    let options = {
      ...this.props.orderOptions,
      paymentMethod: button.paymentMode,
    };

    this.props
      .createOrder(options)
      .then(() => {
        this.setState({ isLoading: false });
        this.props.setPaymentMethod(button.paymentMode);
      })
      .catch(err => console.warn(err));
  };

  copy = (text, field) => {
    this.setState({ [field]: true });
    setTimeout(() => this.setState({ [field]: false }), 2000);
    setClipboardText(text);
  };

  render() {
    const {
      paymentButtons,
      amount,
      accountBalance,
      paymentStatus,
    } = this.props;

    const { order, isLoading, paymentMethod } = this.state;

    const method = paymentMethod;

    // decide if the current payment method is a direct coin payment
    const isDirect = isDirectPayment(method.paymentMode);

    const basePrice = order.payment.altBasePrice || order.payment.satoshiPrice;
    let price = order.payment.altcoinPrice || order.btcPrice;
    let unit = order.payment.altcoinCode || 'BTC';

    let paid;
    let remaining;

    if (paymentStatus.status === 'partial') {
      if (method.paymentMode === 'ethereum') {
        // convert from Szabo to ETH
        paid = paymentStatus.paidAmount;
        paid = Math.floor(paid) / 1000000;
        remaining = basePrice - paymentStatus.paidAmount;
        remaining = Math.floor(remaining) / 1000000;
      } else {
        // bitcoin and bitcoin based altcoins
        // convert from baseAmount to BTC/LTC
        paid = paymentStatus.paidAmount;
        paid = Math.floor(paid / 10000) / 10000;
        remaining = basePrice - paymentStatus.paidAmount;
        remaining = Math.floor(remaining / 10000) / 10000;
      }
    }

    let prefix =
      method.paymentMode === 'bcash' ? 'bitcoincash' : method.paymentMode;

    let paymentAddress;
    let uri;

    let PaymentInstructions = ({ children }) => (
      <div>
        Send <i>exactly</i>
        {children} to this address:
      </div>
    );

    if (isLightningPayment(method.paymentMode)) {
      prefix = 'lightning';
      if (method.paymentMode === 'lightning') {
        unit = 'bits';
        price = order.payment.bitsPrice;
      } else if (method.paymentMode === 'lightning-ltc') {
        // prefix is not always the same as paymentMode
        unit = 'lites';
        price = order.payment.litesPrice;
      }
      paymentAddress = order.payment.lightningInvoice;
      uri = `${prefix}:${paymentAddress}`;
      PaymentInstructions = ({ children }) => (
        <div>
          Copy the invoice below and pay
          {children}
        </div>
      );
    } else if (method.paymentMode === 'ethereum') {
      paymentAddress = order.payment.altcoinAddress;
      uri = `${prefix}:${paymentAddress}?amount=${remaining || price}`;
    } else {
      paymentAddress = order.payment.address;
      uri = `${prefix}:${paymentAddress}?amount=${remaining || price}`;
    }

    const isPartial = paymentStatus.status === 'partial';
    const title = isPartial ? 'Partial payment detected' : 'Payment';
    const subtitle = isPartial
      ? 'Send the remainder to purchase your refill'
      : 'Confirm the details below to purchase your refill';

    return (
      <div>
        <PaymentMenu
          {...this.props}
          {...this.state}
          anchorEl={this.anchorEl}
          paymentButtons={paymentButtons}
          onClick={this.menuClick}
          onClose={this.closeMenu}
          affordProps={{
            amount,
            btcPrice: Number(order.btcPrice),
            accountBalance,
          }}
        />

        <OrderHeader
          order={order}
          title={title}
          subtitle={subtitle}
          icon={<Info />}
        />

        <PaymentLayout {...this.props}>
          <div>
            <div>Pay with</div>
            <div>
              <p
                ref={e => (this.anchorEl = e)}
                style={{ fontWeight: '500' }}
                onClick={() => this.openMenu()}>
                {this.state.paymentMethod.title}
              </p>
              <Button {...styles.changeButton} onClick={() => this.openMenu()}>
                Change
              </Button>
            </div>
          </div>
          <div>
            <div />
            <div>
              {isLoading ? (
                <CircularProgress />
              ) : !isDirect ? (
                <Button
                  raised
                  color="primary"
                  onClick={() => method.paymentModeOptions.callback(order)}>
                  {method.paymentModeOptions.title}
                </Button>
              ) : (
                <div {...styles.container}>
                  <div {...styles.left}>
                    <PaymentInstructions>
                      <Tooltip open={this.state.amountTooltip} title="Copied!">
                        <strong
                          onClick={() => this.copy(price, 'amountTooltip')}>
                          {` ${remaining || price} ${unit} `}
                        </strong>
                      </Tooltip>
                    </PaymentInstructions>
                    <Tooltip open={this.state.addressTooltip} title="Copied!">
                      <BitcoinAddress
                        onClick={() =>
                          this.copy(paymentAddress, 'addressTooltip')
                        }
                        address={paymentAddress}
                      />
                    </Tooltip>
                    <br />
                    <br />
                    {isPartial && (
                      <div {...styles.partialWarning}>
                        We have received a partial payment from you.
                        <br /> You paid <strong>{paid + ' ' + unit}</strong>,
                        but the invoice was for{' '}
                        <strong>{price + ' ' + unit}</strong>.
                        <br />
                        Please send the remaining{' '}
                        <strong>{remaining + ' ' + unit}</strong>
                      </div>
                    )}
                    {window &&
                      window.BITREFILL__PLATFORM !== 'ios' && (
                        <Button
                          {...styles.bottomButton}
                          raised
                          color="primary"
                          onClick={() => (window.location.href = uri)}>
                          {'Open in Wallet'}
                        </Button>
                      )}
                    {isPartial && (
                      <a
                        href={`https://www.bitrefill.com/support/${
                          order.orderId
                        }/${order.payment.address}`}
                        target="_blank"
                        {...styles.help}>
                        Need help?
                      </a>
                    )}
                  </div>
                  <div {...styles.right}>
                    <QrCode value={uri} size={200} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </PaymentLayout>
      </div>
    );
  }
}

export default connect(
  state => ({
    amount: selectAmount(state),
    paymentMethod: selectPaymentMethod(state),
  }),
  {
    createOrder,
    setPaymentMethod,
  }
)(PaymentMode);

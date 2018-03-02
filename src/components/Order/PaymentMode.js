import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createOrder } from '../../actions';

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

import { canAfford, isDirectPayment } from '../../lib/currency-helpers';
import setClipboardText from '../../lib/clipboard-helper';

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
    flex: 1,
    marginRight: '12px',
    marginLeft: '-12px',
    '& img': {
      float: 'right',
    },
    '@media(max-width: 720px)': {
      '& img': {
        marginTop: '24px',
        marginLeft: '12px',
        float: 'left',
      },
    },
  }),
};

class PaymentMode extends React.Component {
  constructor(props) {
    super(props);

    // pick first affordable payment method
    const method = props.paymentButtons.find(btn =>
      canAfford({
        ...props,
        paymentMode: btn.paymentMode,
      })
    );

    this.state = {
      open: false,
      paymentMethod: method,
      isLoading: false,
      order: props.order,
      orders: {},
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

    if (button.paymentMode === 'lightning') {
      options.lightningEnabled = true;
      options.mainnetLightning = true;
    }

    this.props
      .createOrder(options)
      .then(() => this.setState({ isLoading: false }))
      .catch(err => console.warn(err));
  };

  copy = text => {
    this.setState({ addressTooltip: true });
    setTimeout(() => this.setState({ addressTooltip: false }), 2000);
    setClipboardText(text);
  };

  render() {
    const { paymentButtons, paymentStatus } = this.props;
    const { order, isLoading, paymentMethod } = this.state;

    const method = paymentMethod;

    // decide if the current payment method is a direct coin payment
    const isDirect = isDirectPayment(method.paymentMode);

    const basePrice = order.payment.altBasePrice || order.payment.satoshiPrice;
    let price = order.payment.altcoinPrice || order.btcPrice;
    let unit = order.payment.altcoinCode || 'BTC';

    if (paymentStatus.status === 'partial') {
      price = basePrice - paymentStatus.paidAmount;
      price = Math.ceil(price / 10000) / 10000;
    }

    const prefix =
      method.paymentMode === 'bcash' ? 'bitcoincash' : method.paymentMode;
    const uri = prefix + ':' + order.payment.address + '?amount=' + price;

    if (method.paymentMode === 'lightning') {
      unit = 'bits';
      price *= 1000000;
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
                onClick={() => this.openMenu()}
              >
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
                  onClick={() => method.paymentModeOptions.callback(order)}
                >
                  {method.paymentModeOptions.title}
                </Button>
              ) : (
                <div {...styles.container}>
                  <div {...styles.left}>
                    Send <i>exactly</i>
                    <Tooltip>
                      <strong onClick={() => this.copy(price)}>
                        {price + ' ' + unit}
                      </strong>
                    </Tooltip>
                    to this address:
                    <Tooltip open={this.state.addressTooltip} title="Copied!">
                      <BitcoinAddress
                        onClick={() => this.copy(order.payment.address)}
                        address={order.payment.address}
                      />
                    </Tooltip>
                    <br />
                    <br />
                    <Button
                      {...styles.bottomButton}
                      raised
                      color="primary"
                      onClick={() => (window.location.href = uri)}
                    >
                      Open in Wallet
                    </Button>
                  </div>
                  <div {...styles.right}>
                    <QrCode value={uri} size={150} />
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

PaymentMode.propTypes = {
  order: PropTypes.object.isRequired,
  showBTCAddress: PropTypes.bool.isRequired,
  paymentButtons: PropTypes.array,
};

export default connect(state => ({}), {
  createOrder,
})(PaymentMode);

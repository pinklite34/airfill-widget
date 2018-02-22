import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { createOrder } from '../../actions';

import { css } from 'glamor';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

import BitcoinAddress from '../UI/BitcoinAddress';
import Info from './info.svg';
import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';

import QrCode from '../UI/QrCode';

import PaymentMenu from './PaymentMenu';

const styles = {
  list: css({
    display: 'block',
    '> dt': {
      float: 'left',
      textAlign: 'right',
      width: 120,
      fontWeight: 700,
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
    fontWeight: 'bold',
  }),
  changeButton: css({
    color: '#3e8fe4 !important',
    fontWeight: 'bold !important',
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
    '& img': {
      float: 'right',
    },
    '@media(max-width: 720px)': {
      '& img': {
        marginTop: '24px',
        float: 'left',
        width: '70%',
      },
    },
  }),
};

class NewPayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      paymentMethod: props.paymentButtons[0],
      isLoading: false,
    };
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

  render() {
    const { order, paymentButtons, paymentStatus } = this.props;
    const { isLoading, paymentMethod } = this.state;

    const method = paymentMethod;

    // decide if the current payment method is a direct coin payment
    const isDirect = ['bitcoin', 'litecoin', 'lightning', 'dash'].some(
      v => method.paymentMode === v
    );

    let price = order.payment.altcoinPrice || order.btcPrice;
    let unit = order.payment.altcoinCode || 'BTC';

    const prefix =
      method.paymentMode === 'bcash' ? 'bitcoincash' : method.paymentMode;
    const uri = prefix + ':' + order.payment.address + '?amount=' + price;

    if (order.partialPayment) {
      price = Math.ceil(order.remainingAmount / 10000) / 10000;
    }

    if (method.paymentMode === 'lightning') {
      unit = 'bits';
      price *= 1000000;
    }

    const isPartial = paymentStatus.status === 'partial';
    const title = isPartial ? 'Partial payment detected' : 'Payment';
    const subtitle = isPartial
      ? 'Send the remainder to purchase your refill'
      : 'Confirm the details below to purchase your refill';

    // console.log('partial', isPartial);
    // console.log(order);
    console.log(this.props);
    console.log(this.state.isLoading);

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
            <div>
              <p>Pay with</p>
            </div>
            <div>
              <p
                ref={e => (this.anchorEl = e)}
                style={{
                  fontWeight: 'bold',
                }}
                onClick={() => this.openMenu()}
              >
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  this.state.paymentMethod.title
                )}
              </p>
              <Button {...styles.changeButton} onClick={() => this.openMenu()}>
                Change
              </Button>
            </div>
          </div>
          <div>
            <div />
            <div>
              {isLoading ? null : !isDirect ? (
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
                    Send <i>exactly</i> <strong>{price + ' ' + unit}</strong> to
                    this address:
                    <BitcoinAddress address={order.payment.address} />
                    <br />
                    <br />
                    <Button
                      {...styles.bottomButton}
                      raised
                      color="primary"
                      onClick={() => (window.location.href = uri)}
                    >
                      Open wallet
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

NewPayment.propTypes = {
  order: PropTypes.object.isRequired,
  showBTCAddress: PropTypes.bool.isRequired,
  paymentButtons: PropTypes.array,
};

export default connect(state => ({}), {
  createOrder,
})(NewPayment);

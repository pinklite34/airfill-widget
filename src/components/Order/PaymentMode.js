import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css as emotionCss } from 'react-emotion';

import { connect } from 'react-redux';
import { createOrder, setPaymentMethod } from '../../actions';

import { selectAmount, selectPaymentMethod } from '../../store';

import { css } from 'glamor';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import BitcoinAddress from '../UI/BitcoinAddress';
import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';

import QrCode from '../UI/QrCode';

import {
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
  paymentIcon: emotionCss`
    width: 24px;
    height: 24px;
  `,
};

const PaymentIconContainer = styled('div')`
  padding: 6px;
`;

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
    paymentMethod: PropTypes.object.isRequired,
    setPaymentMethod: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // pick first affordable payment method
    /* const methods = props.paymentButtons.filter(btn =>
      canAfford({
        amount: props.amount,
        btcPrice: Number(props.order.btcPrice),
        accountBalance: props.accountBalance,
        paymentMode: btn.paymentMode,
        requireAccountBalance: btn.requireAccountBalance,
      })
    ); */

    this.state = {
      open: false,
      isLoading: false,
      addressTooltip: false,
      amountTooltip: false,
    };
  }

  copy = (text, field) => {
    this.setState({ [field]: true });
    setTimeout(() => this.setState({ [field]: false }), 2000);
    setClipboardText(text);
  };

  render() {
    const { paymentStatus, paymentMethod, order } = this.props;

    // decide if the current payment method is a direct coin payment
    const isDirect = isDirectPayment(paymentMethod.paymentMode);

    const basePrice = order.payment.altBasePrice || order.payment.satoshiPrice;
    let price = order.payment.altcoinPrice || order.btcPrice;
    let unit = order.payment.altcoinCode || 'BTC';

    let paid;
    let remaining;

    if (paymentStatus.status === 'partial') {
      if (paymentMethod.paymentMode === 'ethereum') {
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
      paymentMethod.paymentMode === 'bcash'
        ? 'bitcoincash'
        : paymentMethod.paymentMode;

    let paymentAddress;
    let uri;

    let PaymentInstructions = ({ children }) => (
      <div>
        Send <i>exactly</i>
        {children} to this address:
      </div>
    );

    if (isLightningPayment(paymentMethod.paymentMode)) {
      prefix = 'lightning';
      if (paymentMethod.paymentMode === 'lightning') {
        unit = 'bits';
        price = order.payment.bitsPrice;
      } else if (paymentMethod.paymentMode === 'lightning-ltc') {
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
    } else if (paymentMethod.paymentMode === 'ethereum') {
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
        <OrderHeader order={order} title={title} subtitle={subtitle} />

        <PaymentLayout {...this.props}>
          <div>
            <div>
              <PaymentIconContainer>
                <img src={paymentMethod.icon} className={styles.paymentIcon} />
              </PaymentIconContainer>
            </div>
            <div>
              <p>{paymentMethod.title}</p>
            </div>
          </div>
          <div>
            <div />
            <div>
              {!isDirect ? (
                <Button
                  raised
                  color="primary"
                  onClick={() =>
                    paymentMethod.paymentModeOptions.callback(order)
                  }>
                  {paymentMethod.paymentModeOptions.title}
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
                    <Button
                      {...styles.bottomButton}
                      raised
                      color="primary"
                      onClick={() => (window.location.href = uri)}>
                      {'Open in Wallet'}
                    </Button>
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

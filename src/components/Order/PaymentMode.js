import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { connect } from 'react-redux';
import { setPaymentMethod } from '../../actions';
import { selectAmount, selectPaymentMethod } from '../../store';

import { toWei, getEthInstance } from '../../lib/eth';
import {
  isDirectPayment,
  isLightningPayment,
} from '../../lib/currency-helpers';
import setClipboardText from '../../lib/clipboard-helper';
import { fromWindow } from '../../lib/web-globals';
import {
  orderProp,
  paymentsProp,
  orderOptionsProp,
  amountProp,
  paymentStatusProp,
} from '../../lib/prop-types';

import Button from '../UI/Button';
import Tooltip from 'material-ui/Tooltip';

import BitcoinAddress from '../UI/BitcoinAddress';
import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';

import QrCode from '../UI/QrCode';

const styles = {
  list: css`
    display: block;

    > dt {
      float: left;
      text-align: right;
      width: 120px;
      font-weight: 500;
      margin-right: 24px;
    }

    > dd {
      margin-bottom: 8px;
    }

    @media (max-width: 460px) {
      > dt {
        width: auto;
      }

      > dd {
        text-align: right;
      }
    }
  `,
  paymentMethods: css`
    display: flex;
    align-items: center;
    position: relative;
  `,
  buttonGroup: css`
    margin: -8px;
  `,
  button: css`
    margin: 8px;
  `,
  package: css`
    font-size: 16px;
    color: #323232;
    font-weight: 500;
  `,
  changeButton: css`
    color: #3e8fe4 !important;
    font-weight: 500 !important;
    margin-left: 12px;
  `,
  container: css`
    display: flex;
    width: 100%;
    flex-direction: row;

    @media (max-width: 720px) {
      flex-direction: column;
    }
  `,
  left: css`
    flex: 0 0 70%;

    @media (max-width: 460px) {
      padding-right: 48px;
    }
  `,
  right: css`
    flex: 0 0 28%;
    margin-left: auto;

    & img {
      width: 90%;
    }

    @media (max-width: 720px) {
      margin-left: 0px;

      & img {
        padding-top: 24px;
        width: 50%;
      }
    },
  `,
  partialWarning: css`
    border-radius: 4px;
    padding: 12px;
    background: #ffdfdf;
    margin-bottom: 24px;
  `,
  help: css`
    text-decoration: none;
    color: #3e8fe4;
    padding: 12px;
  `,
  paymentIcon: css`
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
    paymentMethod: PropTypes.object.isRequired,
    setPaymentMethod: PropTypes.func.isRequired,
    onExternalUrl: PropTypes.func,
  };

  static defaultProps = {
    onExternalUrl: uri => (window.location.href = uri),
  };

  state = {
    open: false,
    isLoading: false,
    addressTooltip: false,
    amountTooltip: false,
  };

  onCopy = (text, field) => () => {
    this.setState({ [field]: true });
    setTimeout(() => this.setState({ [field]: false }), 2000);
    setClipboardText(text);
  };

  onOpenWallet = uri => async () => {
    const { onExternalUrl, paymentMethod, order } = this.props;

    if (fromWindow('web3') && paymentMethod.paymentMode === 'ethereum') {
      const eth = await getEthInstance();
      const accounts = await eth.accounts();
      const fromAccount = accounts[0];
      const toAccount = order.payment.altcoinAddress;
      const value = await toWei(order.payment.altcoinPrice);

      if (!fromAccount) return onExternalUrl(uri);

      eth.sendTransaction(
        {
          to: toAccount,
          from: fromAccount,
          value,
          data: '0x',
        },
        err => {
          console.error(err);
          onExternalUrl(uri);
        }
      );
    } else {
      onExternalUrl(uri);
    }
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
      uri = `${prefix}:${paymentAddress}`.toUpperCase();
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
                  onClick={() =>
                    paymentMethod.paymentModeOptions.callback(order)
                  }>
                  {paymentMethod.paymentModeOptions.title}
                </Button>
              ) : (
                <div className={styles.container}>
                  <div className={styles.left}>
                    <PaymentInstructions>
                      <Tooltip open={this.state.amountTooltip} title="Copied!">
                        <strong onClick={this.onCopy(price, 'amountTooltip')}>
                          {` ${remaining || price} ${unit} `}
                        </strong>
                      </Tooltip>
                    </PaymentInstructions>
                    <Tooltip open={this.state.addressTooltip} title="Copied!">
                      <BitcoinAddress
                        onClick={this.onCopy(paymentAddress, 'addressTooltip')}
                        address={paymentAddress}
                      />
                    </Tooltip>
                    <br />
                    <br />
                    {isPartial && (
                      <div className={styles.partialWarning}>
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
                      className={styles.bottomButton}
                      onClick={this.onOpenWallet(uri)}>
                      {'Open in Wallet'}
                    </Button>
                    {isPartial && (
                      <a
                        href={`https://www.bitrefill.com/support/${
                          order.orderId
                        }/${order.payment.address}`}
                        target="_blank"
                        className={styles.help}>
                        Need help?
                      </a>
                    )}
                  </div>
                  <div className={styles.right}>
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
    setPaymentMethod,
  }
)(PaymentMode);

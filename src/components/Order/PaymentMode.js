import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

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
import DeviceInfo from '../../lib/DeviceInfo';

import Button from '../UI/Button';
import Tooltip from 'material-ui/Tooltip';

import BitcoinAddress from '../UI/BitcoinAddress';
import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';

import QrCode from '../UI/QrCode';
import Flex from '../UI/Flex';
import Text from '../UI/Text';
import Link from '../UI/Link';

const Icon = styled('img')`
  width: 24px;
  height: 24px;
  margin: 0 10px 0 0;
`;

const PartialWarning = styled('div')`
  border-radius: 4px;
  padding: 12px;
  background: #ffdfdf;
`;

const PaymentSection = styled('div')`
  margin-bottom: 16px;
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
    } else if (paymentMethod.paymentMode === 'ethereum') {
      paymentAddress = order.payment.altcoinAddress;
      uri = `${prefix}:${paymentAddress}?amount=${remaining || price}`;
    } else {
      paymentAddress = order.payment.address;
      uri = `${prefix}:${paymentAddress}?amount=${remaining || price}`;
    }

    const isPartial = paymentStatus.status === 'partial';
    const displayPrice = remaining || price;

    return (
      <div>
        <OrderHeader
          order={order}
          title={
            isPartial
              ? {
                  id: 'order.partial.title',
                  children: 'Partial payment detected',
                }
              : { id: 'order.default.title', children: 'Payment' }
          }
          subtitle={
            isPartial
              ? {
                  id: 'order.partial.subtitle',
                  children: 'Send the remainder to purchase your refill',
                }
              : {
                  id: 'order.default.subtitle',
                  children: 'Confirm the details below to purchase your refill',
                }
          }
        />

        <DeviceInfo>
          {({ greaterThan }) => (
            <PaymentLayout {...this.props}>
              <Flex row alignItems="center" padding="0 0 16px 0">
                <Icon src={paymentMethod.icon} />
                <Text type="h3">{paymentMethod.title}</Text>
              </Flex>

              {!isDirect ? (
                <Button
                  onClick={() =>
                    paymentMethod.paymentModeOptions.callback(order)
                  }>
                  {paymentMethod.paymentModeOptions.title}
                </Button>
              ) : (
                <Flex row={greaterThan.tablet} width="100%">
                  <Flex
                    style={{ flex: 1 }}
                    justifyContent="flex-start"
                    padding={greaterThan.tablet ? '0 16px 0 0' : '0 0 16px'}>
                    <PaymentSection>
                      {isLightningPayment(paymentMethod.paymentMode) ? (
                        <Text id="order.payment.sendLightning">
                          Copy the invoice below and pay{' '}
                          <strong>
                            {{ displayPrice }} {{ unit }}
                          </strong>
                        </Text>
                      ) : (
                        <Text id="order.payment.send">
                          Send <i>exactly</i>{' '}
                          <strong>
                            {{ displayPrice }} {{ unit }}
                          </strong>{' '}
                          to this address:
                        </Text>
                      )}
                    </PaymentSection>

                    <PaymentSection>
                      <Tooltip open={this.state.addressTooltip} title="Copied!">
                        <BitcoinAddress
                          onClick={this.onCopy(
                            paymentAddress,
                            'addressTooltip'
                          )}
                          address={paymentAddress}
                        />
                      </Tooltip>
                    </PaymentSection>

                    {isPartial && (
                      <PaymentSection>
                        <PartialWarning>
                          We have received a partial payment from you.
                          <br /> You paid <strong>{paid + ' ' + unit}</strong>,
                          but the invoice was for{' '}
                          <strong>{price + ' ' + unit}</strong>.
                          <br />
                          Please send the remaining{' '}
                          <strong>{remaining + ' ' + unit}</strong>
                        </PartialWarning>
                      </PaymentSection>
                    )}

                    <PaymentSection>
                      <Button
                        onClick={this.onOpenWallet(uri)}
                        text={{
                          id: 'button.openwallet',
                          children: 'Open in Wallet',
                        }}
                      />
                    </PaymentSection>

                    {isPartial && (
                      <PaymentSection>
                        <Link
                          href={`https://www.bitrefill.com/support/${
                            order.orderId
                          }/${order.payment.address}`}>
                          <Text id="order.help">Need help?</Text>
                        </Link>
                      </PaymentSection>
                    )}
                  </Flex>

                  <div>
                    <QrCode value={uri} size={200} />
                  </div>
                </Flex>
              )}
            </PaymentLayout>
          )}
        </DeviceInfo>
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

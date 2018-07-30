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
import { fromWindow } from '../../lib/globals';
import {
  orderProp,
  paymentsProp,
  orderOptionsProp,
  amountProp,
  paymentStatusProp,
} from '../../lib/prop-types';
import DeviceInfo from '../../lib/DeviceInfo';

import Button from '../UI/Button';

import BitcoinAddress from '../UI/BitcoinAddress';
import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';

import QrCode from '../UI/QrCode';
import Flex from '../UI/Flex';
import Text from '../UI/Text';
import Link from '../UI/Link';
import Icon from '../UI/Icon';
import { getPaymentInfo } from '../../lib/price';

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
    onExternalUrl: uri => window.open(uri),
  };

  state = {
    open: false,
    isLoading: false,
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

    const isPartial = paymentStatus.status === 'partial';

    const {
      displayPrice,
      unit,
      paymentAddress,
      remaining,
      price,
      paid,
      uri,
    } = getPaymentInfo(paymentMethod.paymentMode, paymentStatus, order);

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
                <Icon
                  src={paymentMethod.icon}
                  alt={paymentMethod.title}
                  margin="0 8px 0 0"
                />
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
                      <BitcoinAddress
                        onClick={() => setClipboardText(paymentAddress)}
                        address={paymentAddress}
                      />
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

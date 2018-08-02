import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { setPaymentMethod } from '../../actions';
import {
  isDirectPayment,
  isLightningPayment,
} from '../../lib/currency-helpers';
import DeviceInfo from '../../lib/DeviceInfo';
import { getEthInstance, toWei } from '../../lib/eth';
import { fromWindow } from '../../lib/globals';
import { getPaymentInfo } from '../../lib/price';
import {
  amountProp,
  orderOptionsProp,
  orderProp,
  paymentProp,
  paymentsProp,
  paymentStatusProp,
} from '../../lib/prop-types';
import { selectAmount, selectPaymentMethod } from '../../store';
import BitcoinAddress from '../UI/BitcoinAddress';
import Button from '../UI/Button';
import Flex from '../UI/Flex';
import Icon from '../UI/Icon';
import Link from '../UI/Link';
import OrderHeader from '../UI/OrderHeader';
import QrCode from '../UI/QrCode';
import Text from '../UI/Text';
import PaymentLayout from './PaymentLayout';
import theme from '../../theme';

const PartialWarning = styled('div')`
  border-radius: 4px;
  padding: 12px;
  background: #ffdfdf;
`;

const PaymentSection = styled('div')`
  margin-bottom: 16px;
`;

const PaymentContainer = styled('div')`
  display: flex;
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
    paymentMethod: paymentProp,
    setPaymentMethod: PropTypes.func.isRequired,
    onExternalUrl: PropTypes.func,
  };

  static defaultProps = {
    onExternalUrl: uri => window.open(uri, '_blank'),
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
    const { paymentStatus, paymentMethod = {}, order } = this.props;
    const title =
      paymentMethod.paymentModeOptions &&
      paymentMethod.paymentModeOptions.title;

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
            <PaymentLayout
              fullWidth
              childPadding="18px 18px 52px 18px"
              {...this.props}>
              {!isDirect ? (
                <Button
                  onClick={() =>
                    paymentMethod.paymentModeOptions.callback(order)
                  }>
                  {}
                  {title && title.id ? (
                    <Text {...title} />
                  ) : (
                    <Text>{title}</Text>
                  )}
                </Button>
              ) : (
                <Flex row={greaterThan.tablet} width="100%">
                  <Flex
                    style={{ flex: 1 }}
                    justifyContent="flex-start"
                    // padding={greaterThan.tablet ? '0 16px 0 0' : '0 0 16px'}>
                  >
                    {/* <PaymentSection>
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
                      <BitcoinAddress address={paymentAddress} />
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

                    {isPartial && (
                      <PaymentSection>
                        <Link
                          href={`https://www.bitrefill.com/support/${
                            order.orderId
                          }/${order.payment.address}`}>
                          <Text id="order.help">Need help?</Text>
                        </Link>
                      </PaymentSection>
                    )} */}
                    <Flex row>
                      <div style={{ flex: 2 }}>
                        <QrCode
                          value={uri}
                          foreground={theme.tx.primary}
                          foregroundAlpha={0.8}
                          size={200}
                        />
                        <Button
                          onClick={this.onOpenWallet(uri)}
                          text={{
                            id: 'button.openwallet',
                            children: 'Open in Wallet',
                          }}
                          width="100%"
                        />
                      </div>
                      <div style={{ flex: 5, marginLeft: '12px' }}>
                        <Text type="p" centered>
                          SEND THIS AMOUNT
                        </Text>
                        <Flex row margin="0 auto" centered>
                          <BitcoinAddress copy={displayPrice} size="36px">
                            {displayPrice}
                          </BitcoinAddress>
                          <Text
                            type="p"
                            size="36px"
                            centered
                            margin="0 0 0 16px"
                            lineHeight={1}>
                            {unit}
                          </Text>
                        </Flex>
                        <div
                          style={{
                            width: '100%',
                            height: '1px',
                            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                            margin: '24px 0',
                          }}
                        />
                        <Text type="p" centered id="order.payment.to">
                          TO THIS{' '}
                          {(
                            paymentMethod.title.children || paymentMethod.title
                          ).toUpperCase()}{' '}
                          ({unit}) ADDRESS
                        </Text>
                        <BitcoinAddress copy={paymentAddress} width="100%">
                          <Flex row justifyContent="left">
                            <Icon
                              src={paymentMethod.icon}
                              alt={
                                (paymentMethod.title &&
                                  paymentMethod.title.id) ||
                                paymentMethod.title
                              }
                            />
                            <span style={{ lineHeight: 1.5, fontSize: '19px' }}>
                              {paymentAddress}
                            </span>
                          </Flex>
                        </BitcoinAddress>
                      </div>
                    </Flex>
                  </Flex>
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

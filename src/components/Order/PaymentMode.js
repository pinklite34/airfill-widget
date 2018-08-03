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
import CopyField from '../UI/CopyField';
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

const Address = styled('p')`
  line-height: 1.5;
  font-size: 14px;
  margin: 0;
  text-align: center;

  overflow: hidden;
  text-overflow: ellipsis;
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

    const isLightning = isLightningPayment(paymentMethod.paymentMode);

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
          {({ is, greaterThan }) => (
            <PaymentLayout fullWidth={isDirect} {...this.props}>
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
                    width="100%"
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
                      <CopyField address={paymentAddress} />
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
                    <Flex
                      direction={is.mobile ? 'column-reverse' : 'row'}
                      padding="14px">
                      <Flex
                        direction={is.mobile ? 'column-reverse' : 'column'}
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          flex: 2,
                        }}>
                        <QrCode
                          value={uri}
                          foreground={theme.tx.primary}
                          foregroundAlpha={0.8}
                          size={200}
                        />
                        <Button
                          background={paymentMethod.color}
                          onClick={this.onOpenWallet(uri)}
                          text={{
                            id: 'button.openwallet',
                            children: 'Open in Wallet',
                          }}
                          width="200px"
                          margin="12px 0"
                        />
                      </Flex>
                      <div
                        style={{
                          flex: 5,
                          marginLeft: '12px',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}>
                        <Flex row margin="0 auto" centered>
                          <CopyField
                            copy={displayPrice}
                            size="24px"
                            label={
                              <Text type="p" centered>
                                SEND THIS AMOUNT
                              </Text>
                            }>
                            {displayPrice} {unit}
                          </CopyField>
                        </Flex>
                        <div
                          style={{
                            width: '100%',
                            height: '1px',
                            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                            margin: '24px 0',
                          }}
                        />

                        <CopyField
                          copy={paymentAddress}
                          width="100%"
                          label={
                            isLightning ? (
                              <Text
                                type="p"
                                centered
                                id="order.payment.toLightning">
                                Copy the Lightning invoice
                              </Text>
                            ) : (
                              <Text type="p" centered id="order.payment.to">
                                TO THIS{' '}
                                {(
                                  paymentMethod.title.children ||
                                  paymentMethod.title
                                ).toUpperCase()}{' '}
                                ADDRESS
                              </Text>
                            )
                          }>
                          {/* <Flex row justifyContent="center">
                            {/* <Icon
                              src={paymentMethod.icon}
                              alt={
                                (paymentMethod.title &&
                                  paymentMethod.title.id) ||
                                paymentMethod.title
                              }
                            /> } */}

                          <Flex justifyContent="center" width="100%">
                            <Address>{paymentAddress}</Address>
                          </Flex>
                        </CopyField>
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

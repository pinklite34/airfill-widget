import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { paymentStatusProp, orderProp, fnProp } from '../../lib/prop-types';
import setClipboardText from '../../lib/clipboard-helper';

import PaymentLayout from './PaymentLayout';
import OrderHeader from '../UI/OrderHeader';
import Button from '../UI/Button';
import Link from '../UI/Link';
import Text from '../UI/Text';

import Confirmed from './confirmed.svg';

const PinContainer = styled('div')`
  border: ${p => p.theme.bd.dotted};
  cursor: pointer;
  padding: 6px 32px;
`;

const PinLabel = ({ children, ...props }) => (
  <Text type="h1" margin="8px 0" weight="600" {...props}>
    {children}
  </Text>
);

PinLabel.propTypes = {
  children: PropTypes.any,
};

export default function RefillDelivered(props) {
  const { paymentStatus } = props;

  /* let pinInfo = {
    pin: '1234 1234 5678 6666',
    instructions:
      'To redeem this gift card, go to "Your Account" on Amazon.com and select "Gift Cards"',
    other:
      'Amazon.com Gift Cards* never expire and can be redeemed towards millions of items at www.amazon.com.',
  }; */

  const pinInfo =
    paymentStatus.deliveryData && paymentStatus.deliveryData.pinInfo;

  return (
    <Fragment>
      <OrderHeader
        order={props.order}
        title={{ id: 'order.delivered.title', children: 'Refill delivered' }}
        subtitle={
          pinInfo
            ? {
                id: 'order.delivered.subtitle.pin',
                children:
                  'See below for instructions on applying your voucher code',
              }
            : {
                id: 'order.delivered.subtitle',
                children:
                  'The refill delivery has been confirmed by the operator',
              }
        }
        icon={<Confirmed />}
      />

      <PaymentLayout {...props}>
        {pinInfo && (
          <Fragment>
            {pinInfo.pin && (
              <PinContainer onClick={() => setClipboardText(pinInfo.pin)}>
                <PinLabel
                  type="h1"
                  id="order.delivered.giftcard"
                  margin="8px 0">
                  Gift card code
                </PinLabel>
                <p style={{ fontFamily: 'monospace' }}>{pinInfo.pin}</p>
              </PinContainer>
            )}
            {pinInfo.instructions && (
              <div>
                <PinLabel
                  type="h1"
                  id="order.delivered.instructions"
                  margin="8px 0">
                  Instructions
                </PinLabel>
                <Text
                  type="p"
                  dangerouslySetInnerHTML={{ __html: pinInfo.instructions }}
                />
              </div>
            )}
            {pinInfo.other && (
              <div>
                <PinLabel
                  type="h1"
                  id="order.delivered.other"
                  margin="8px 0"
                  weight="600">
                  Other Info
                </PinLabel>
                <Text
                  type="p"
                  dangerouslySetInnerHTML={{ __html: pinInfo.other }}
                />
              </div>
            )}
          </Fragment>
        )}

        <Link href="https://www.bitrefill.com/faq/#my-topup-did-not-arrive">
          <Text id="order.delivered.link">Can&apos;t see your refill?</Text>
        </Link>

        <Button
          margin="12px 0 0"
          onClick={props.onReset}
          text={{
            id: 'button.refillagain',
            children: 'Buy another refill',
          }}
        />
      </PaymentLayout>
    </Fragment>
  );
}

RefillDelivered.propTypes = {
  paymentStatus: paymentStatusProp,
  order: orderProp,
  onReset: fnProp,
};

import * as React from 'react';
import styled from 'react-emotion';

import { Order, PaymentStatus } from '../../types';
import Button from '../UI/Button';
import Link from '../UI/Link';
import OrderHeader from '../UI/OrderHeader';
import Text from '../UI/Text';
import Confirmed from './confirmed.svg';
import PaymentLayout from './PaymentLayout';

const PinContainer = styled('div')`
  border: ${(p: any) => p.theme.bd.dotted};
  cursor: pointer;
  padding: 6px 32px;
`;

const PinLabel = ({ children, ...props }) => (
  <Text type="h1" margin="8px 0" weight="600" {...props}>
    {children}
  </Text>
);

interface RefillDeliveredProps {
  paymentStatus: PaymentStatus;
  order: Order;
  onReset: () => void;
}

export default function RefillDelivered(props: RefillDeliveredProps) {
  const { paymentStatus, order } = props;

  /* let pinInfo = {
    pin: '1234 1234 5678 6666',
    instructions:
      'To redeem this gift card, go to "Your Account" on Amazon.com and select "Gift Cards"',
    other:
      'Amazon.com Gift Cards* never expire and can be redeemed towards millions of items at www.amazon.com.',
  }; */

  const pinInfo =
    paymentStatus.deliveryData && paymentStatus.deliveryData.pinInfo;

  const linkInfo = order.linkInfo;

  return (
    <React.Fragment>
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
          <React.Fragment>
            {pinInfo.pin && (
              <PinContainer>
                <PinLabel
                  type="h1"
                  id="order.delivered.giftcard"
                  margin="8px 0"
                >
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
                  margin="8px 0"
                >
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
                  weight="600"
                >
                  Other Info
                </PinLabel>
                <Text
                  type="p"
                  dangerouslySetInnerHTML={{ __html: pinInfo.other }}
                />
              </div>
            )}
          </React.Fragment>
        )}

        {linkInfo && (
          <Link href={linkInfo.link}>
            <PinLabel
              type="p"
              id="order.delivered.other"
              margin="8px 0"
              weight="600"
            >
              {linkInfo.other}
            </PinLabel>
          </Link>
        )}

        {!linkInfo && (
          <Link href="https://www.bitrefill.com/faq/#my-topup-did-not-arrive">
            <Text id="order.delivered.link">Can&apos;t see your refill?</Text>
          </Link>
        )}

        <Button
          margin="12px 0 0"
          onClick={props.onReset}
          text={{
            id: 'button.refillagain',
            children: 'Buy another refill',
          }}
        />
      </PaymentLayout>
    </React.Fragment>
  );
}

import React, { Fragment } from 'react';

import { paymentStatusProp, orderProp, fnProp } from '../../lib/prop-types';

import PaymentLayout from './PaymentLayout';
import OrderHeader from '../UI/OrderHeader';
import Button from '../UI/Button';
import Link from '../UI/Link';
import Text from '../UI/Text';

import Confirmed from './confirmed.svg';

export default function RefillDelivered(props) {
  const { paymentStatus } = props;

  /* paymentStatus.pinInfo = {
    pin: 'pin',
    instructions: 'instructions',
    other: 'other',
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
              <div>
                <div>PIN</div>
                <div>{pinInfo.pin}</div>
              </div>
            )}
            {(pinInfo.instructions || pinInfo.other) && (
              <div>
                <div />
                <div>
                  {pinInfo.instructions}
                  <br />
                  {pinInfo.other}
                </div>
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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { orderProp, paymentStatusProp, fnProp } from '../../lib/prop-types';

import PaymentLayout from './PaymentLayout';
import RefillFailedAction from './RefillFailedAction';
import RefillFailedInfo from './RefillFailedInfo';

import Link from '../UI/Link';
import Text from '../UI/Text';
import OrderHeader from '../UI/OrderHeader';

import Error from './error.svg';

function getMailTo({ order, refundAddress }) {
  const subject = encodeURIComponent(`Failed Order (ID ${order.id})`);
  const body = encodeURIComponent(`Hello,

My order (ID ${
    order.id
  }) failed to process. I'd like a refund to be sent to <Replace This With Your Refund Address>.

Thanks!`);
  const mailTo = `mailto:support@bitrefill.com?subject=${subject}`;

  return refundAddress ? mailTo : `${mailTo}&body=${body}`;
}

export default function RefillFailed(props) {
  const {
    order,
    paymentStatus: { failureData = {} },
    refundAddress,
    onReset,
  } = props;

  const needRefund =
    failureData && failureData.needRefund != null
      ? failureData.needRefund
      : order.needRefund;

  const mailTo = getMailTo({ order, refundAddress });

  return (
    <Fragment>
      <OrderHeader
        order={order}
        title={{ id: 'order.failed.title', children: 'Delivery error' }}
        subtitle={{
          id: 'order.failed.subtitle',
          children: 'The refill could not be delivered to the target account',
        }}
        icon={<Error />}
      />

      <PaymentLayout {...props}>
        {order.errorMessage && (
          <Text type="p" size="14px">
            {order.errorMessage}
          </Text>
        )}

        <RefillFailedInfo
          refundAddress={refundAddress}
          needRefund={needRefund}
          order={order}
        />

        <RefillFailedAction
          refundAddress={refundAddress}
          needRefund={needRefund}
          order={order}
          mailTo={mailTo}
          onReset={onReset}
        />

        <Link
          href={`https://www.bitrefill.com/support/${order.orderId}/${
            order.payment.address
          }`}
          style={{ padding: '10px 0' }}>
          <Text id="order.failed.more">Click here for more information</Text>
        </Link>
      </PaymentLayout>
    </Fragment>
  );
}

RefillFailed.propTypes = {
  order: orderProp,
  paymentStatus: paymentStatusProp,
  refundAddress: PropTypes.string,
  onReset: fnProp,
};

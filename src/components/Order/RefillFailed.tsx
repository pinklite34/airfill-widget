import * as React from 'react';

import { Order, PaymentStatus } from '../../lib/prop-types';
import Link from '../UI/Link';
import OrderHeader from '../UI/OrderHeader';
import OrderStatusButton from '../UI/OrderStatusButton';
import Text from '../UI/Text';
import Error from './error.svg';
import PaymentLayout from './PaymentLayout';

function getMailTo({ order, refundAddress }) {
  const subject = encodeURIComponent(`Failed Order (ID ${order.id})`);
  const body = encodeURIComponent(`Hello,

My order (ID ${
    order.id
  }) failed to process. I'd like a refund to be sent to ${refundAddress ||
    '<Replace This With Your Refund Address>'}.

Thanks!`);

  return `mailto:support@bitrefill.com?subject=${subject}&body=${body}`;
}

interface RefillFailedProps {
  order: Order;
  paymentStatus: PaymentStatus;
  refundAddress: string;
}

export default function RefillFailed(props: RefillFailedProps) {
  const {
    order,
    paymentStatus: { failureData = {} },
    refundAddress,
  } = props;

  const needRefund =
    failureData && failureData.needRefund != null
      ? failureData.needRefund
      : order.needRefund;

  const mailTo = getMailTo({ order, refundAddress });
  const isRefunded =
    !refundAddress && (needRefund === false || order.refunded === true);

  return (
    <React.Fragment>
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
          <Text error type="p" size="14px">
            {order.errorMessage}
          </Text>
        )}

        {isRefunded ? (
          <Text type="p" id="order.failed.info.check">
            We have sent you an automatic refund. Please make sure your details
            are correct and try again!
          </Text>
        ) : refundAddress ? (
          <Text type="p" id="order.failed.info.soon">
            We have sent you an automatic refund. You should receive it within a
            few minutes.
          </Text>
        ) : null}

        <OrderStatusButton
          order={order}
          text={
            !isRefunded && !refundAddress
              ? {
                  id: 'order.failed.refund',
                  children: 'Request a refund',
                }
              : null
          }
        />

        {refundAddress ? (
          <Text type="p" id="order.failed.transaction">
            <Link
              href={`https://live.blockcypher.com/btc/address/${refundAddress}/`}
            >
              Click here to see how it&apos;s going
            </Link>{' '}
            or <Link href={mailTo}>contact support@bitefill.com</Link>.
          </Text>
        ) : (
          <Link href={mailTo}>
            <Text type="link" id="order.failed.support">
              Click to email support
            </Text>
          </Link>
        )}
      </PaymentLayout>
    </React.Fragment>
  );
}

/* RefillFailed.propTypes = {
  order: orderProp,
  paymentStatus: paymentStatusProp,
  refundAddress: PropTypes.string,
};
 */

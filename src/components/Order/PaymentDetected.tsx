import * as React from 'react';

import { Order } from '../../lib/prop-types';
import Button from '../UI/Button';
import Link from '../UI/Link';
import OrderHeader from '../UI/OrderHeader';
import Spinner from '../UI/Spinner';
import Text from '../UI/Text';
import PaymentLayout from './PaymentLayout';

interface PaymentDetectedProps {
  order: Order;
  onReset: () => void;
}

export default function PaymentDetected(props: PaymentDetectedProps) {
  const { order, onReset } = props;
  return (
    <React.Fragment>
      <OrderHeader
        order={props.order}
        title={{ id: 'order.detected.title', children: 'Payment detected' }}
        subtitle={{
          id: 'order.detected.subtitle',
          children: "We're waiting for your payment to be confirmed",
        }}
        icon={<Spinner tight />}
      />

      <PaymentLayout {...props}>
        <Text type="p" id="order.detected.info.1">
          We will send your refill as soon as the transaction is completed. This
          can be slow if the network is very busy, but usually it only takes a
          few minutes!
        </Text>
        <Text type="p" id="order.detected.info.2">
          This page will update with additional details when we have confirmed
          your payment.
        </Text>

        {order.paymentMethod === 'bitcoin' && (
          <Link
            href={`https://transactioncheck.bitrefill.com/lookup/${
              order.payment.address
            }`}
          >
            <Text id="order.detected.link">
              Click here to see how it&apos;s going
            </Text>
          </Link>
        )}

        <Button
          margin="12px 0 0"
          onClick={onReset}
          text={{
            id: 'button.refillagain',
            children: 'Buy another refill',
          }}
        />
      </PaymentLayout>
    </React.Fragment>
  );
}

/* PaymentDetected.propTypes = {
  order: orderProp,
  onReset: fnProp,
};
 */

import React, { Fragment } from 'react';

import { orderProp } from '../../lib/prop-types';

import PaymentLayout from './PaymentLayout';
import OrderHeader from '../UI/OrderHeader';
import Spinner from '../UI/Spinner';
import Text from '../UI/Text';

export default function PaymentConfirmed(props) {
  return (
    <Fragment>
      <OrderHeader
        order={props.order}
        title={{ id: 'order.confirmed.title', children: 'Refill sent!' }}
        subtitle={{
          id: 'order.confirmed.subtitle',
          children: 'Waiting for delivery confirmation',
        }}
        icon={<Spinner tight />}
      />
      <PaymentLayout {...props}>
        <Text id="order.confirmed.info" type="p">
          The refill should arrive on the target account any minute now.
        </Text>
      </PaymentLayout>
    </Fragment>
  );
}

PaymentConfirmed.propTypes = {
  order: orderProp,
};

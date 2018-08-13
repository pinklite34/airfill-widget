import * as React  from 'react';
import Button from '../UI/Button';

import { orderProp, fnProp } from '../../lib/prop-types';
import OrderHeader from '../UI/OrderHeader';
import Error from './error.svg';
import PaymentLayout from './PaymentLayout';

export default function PaymentExpired(props) {
  return (
     <React.Fragment>
      <OrderHeader
        order={props.order}
        title={{ id: 'order.expired.title', children: 'Order expired' }}
        subtitle={{
          id: 'order.expired.subtitle',
          children: 'This order has expired',
        }}
        icon={<Error />}
      />

      <PaymentLayout {...props}>
        <Button
          onClick={props.onReset}
          text={{ id: 'button.neworder', children: 'New order' }}
        />
      </PaymentLayout>
     </React.Fragment>
  );
}

/* PaymentExpired.propTypes = {
  order: orderProp,
  onReset: fnProp,
}; */

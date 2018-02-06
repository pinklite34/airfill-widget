import PropTypes from 'prop-types';
import React from 'react';
import OrderStatus from '../UI/OrderStatus';
import OrderStep from '../UI/OrderStep';
import OrderHeader from '../UI/OrderHeader';
import { css } from 'glamor';
import CircularProgress from 'material-ui/Progress/CircularProgress';

const styles = {
  container: css({
    padding: 16
  })
};

const PaymentDetected = ({ order }) => {
  return (
    <div>
      <OrderHeader
        order={order}
        title="Payment detected"
        subtitle="We're waiting for your payment to be confirmed"
        icon={<CircularProgress/>}
      />
      <div {...styles.container}>

      </div>
    </div>
  );
};

PaymentDetected.propTypes = {
  order: PropTypes.object.isRequired
};

export default PaymentDetected;

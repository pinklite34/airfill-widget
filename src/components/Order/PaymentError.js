import PropTypes from 'prop-types';
import React from 'react';
import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';
import Error from './error.svg';
import { css } from 'glamor';

const styles = {
  textContainer: css({
    display: 'block !important',
    lineHeight: '21px',
    marginRight: '48px',
  }),
  info: css({
    color: '#777777',
    fontSize: '14px',
  }),
  button: css({
    marginTop: '12px',
  }),
};

const PaymentError = props => {
  const { order, paymentStatus: { message = '' } } = props;

  return (
    <div>
      <OrderHeader
        order={order}
        title="Payment error"
        subtitle="The payment could not be completed"
        icon={<Error />}
      />
      <PaymentLayout {...props}>
        <div>
          <div />
          <div {...styles.textContainer}>
            <span {...styles.info}>{message}</span>
          </div>
        </div>
      </PaymentLayout>
    </div>
  );
};

PaymentError.propTypes = {
  order: PropTypes.object.isRequired,
};

export default PaymentError;

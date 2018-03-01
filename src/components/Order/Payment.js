import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { push } from 'react-router-redux';

import { CircularProgress } from 'material-ui/Progress';

import PusherSubscription from '@bitrefill/react-pusher';

import PaymentMode from './PaymentMode';
import PaymentDetected from './PaymentDetected';
import PaymentConfirmed from './PaymentConfirmed';
import ExpiredPayment from './PaymentExpired';
import RefillFailed from './RefillFailed';
import RefillDelivered from './RefillDelivered';
import BalanceTooLow from './BalanceTooLow';

import {
  selectOrder,
  selectOperator,
  selectNumber,
  selectCountry,
  selectPaymentStatus,
} from './../../store';

import { updatePaymentStatus } from '../../actions';

const componentForStatus = status => {
  switch (status) {
    case 'paid':
      return PaymentDetected;
    case 'confirmed':
      return PaymentConfirmed;
    case 'expired':
      return ExpiredPayment;
    case 'failed':
      return RefillFailed;
    case 'delivered':
      return RefillDelivered;
    case 'balance-too-low':
      return BalanceTooLow;
    case 'partial':
    default:
      return PaymentMode;
  }
};

const styles = {
  title: css({
    margin: 0,
  }),
  spinner: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 64,
  }),
  spinnerText: css({
    marginTop: 16,
  }),
};

const Payment = ({
  history,
  accountBalance = Number.POSITIVE_INFINITY,
  requireAccountBalance = false,
  refundAddress = '',
  paymentButtons = null,
  showBTCAddress = true,
  billingCurrency = 'XBT',
  orderOptions,
  order,
  operator,
  number,
  country,
  paymentStatus,

  updatePaymentStatus,
  reset,
}) => {
  if (!order.result) {
    return (
      <div {...styles.spinner}>
        <CircularProgress />
        <div {...styles.spinnerText}>Loading order status...</div>
      </div>
    );
  }

  const PaymentComponent = componentForStatus(paymentStatus.status);
  const { orderId, payment: { address } } = order.result;

  return (
    <div>
      <PusherSubscription
        onError={({ err, info }) => console.error('pusher', err, info)}
        channel={[orderId, address].join('-')}
        events={[
          'paid',
          'confirmed',
          'partial',
          'failed',
          'delivered',
          'expired',
        ]}
        onUpdate={(event, data) =>
          updatePaymentStatus({
            status: event,
            orderId,
            data,
          })
        }
      >
        <PaymentComponent
          history={history}
          order={order.result}
          orderOptions={orderOptions}
          operator={operator.result}
          country={country}
          accountBalance={accountBalance}
          requireAccountBalance={requireAccountBalance}
          paymentButtons={paymentButtons}
          paymentStatus={paymentStatus}
          showBTCAddress={showBTCAddress}
          refundAddress={refundAddress}
          billingCurrency={billingCurrency}
          number={number}
          onReset={reset}
        />
      </PusherSubscription>
    </div>
  );
};

export default connect(
  state => ({
    order: selectOrder(state),
    operator: selectOperator(state),
    country: selectCountry(state),
    paymentStatus: selectPaymentStatus(state),
    number: selectNumber(state),
  }),
  dispatch => ({
    updatePaymentStatus: (...args) => dispatch(updatePaymentStatus(...args)),
    reset: () => dispatch(push('/refill')),
  })
)(Payment);

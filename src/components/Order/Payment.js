import React from 'react';
import PropTypes from 'prop-types';
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
import PaymentError from './PaymentError';

import {
  selectOrder,
  selectOperator,
  selectNumber,
  selectCountry,
  selectPaymentStatus,
} from './../../store';

import { updatePaymentStatus } from '../../actions';
import {
  historyProp,
  currencyProp,
  operatorResultProp,
  countryProp,
  orderOptionsProp,
  orderResultProp,
  paymentStatusProp,
  fnProp,
  amountProp,
  numberProp,
  paymentsProp,
} from '../../lib/prop-types';

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
    case 'payment_error':
      return PaymentError;
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

function Payment({
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
}) {
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
        channel={[orderId, address].join('-')}
        events={[
          'paid',
          'confirmed',
          'partial',
          'failed',
          'delivered',
          'expired',
          'payment_error',
        ]}
        onUpdate={(event, data) =>
          updatePaymentStatus({
            status: event,
            orderId,
            data,
          })
        }
      />
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
    </div>
  );
}

Payment.propTypes = {
  history: historyProp,
  accountBalance: amountProp,
  requireAccountBalance: PropTypes.bool,
  refundAddress: PropTypes.string,
  paymentButtons: paymentsProp,
  showBTCAddress: PropTypes.bool,
  billingCurrency: currencyProp,
  orderOptions: orderOptionsProp,
  order: orderResultProp,
  operator: operatorResultProp,
  number: numberProp,
  country: countryProp,
  paymentStatus: paymentStatusProp,
  updatePaymentStatus: fnProp,
  reset: fnProp,
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
    reset: () => dispatch(push('/refill/selectAmount')),
  })
)(Payment);

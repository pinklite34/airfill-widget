import * as React  from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { PUSHER_API_KEY } from '../../constants';

import Pusher from '../Pusher';
import PaymentMode from './PaymentMode';
import PaymentDetected from './PaymentDetected';
import PaymentConfirmed from './PaymentConfirmed';
import PaymentExpired from './PaymentExpired';
import RefillFailed from './RefillFailed';
import RefillDelivered from './RefillDelivered';
import BalanceTooLow from './BalanceTooLow';
import PaymentError from './PaymentError';
import Spinner from '../UI/Spinner';

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
      return PaymentExpired;
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
  onExternalUrl,
  reset,
}) {
  if (!order.result) return <Spinner />;

  const PaymentComponent = componentForStatus(paymentStatus.status);
  const {
    orderId,
    payment: { address },
  } = order.result;

  return (
     <React.Fragment>
      <Pusher
        apiKey={PUSHER_API_KEY}
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
        onExternalUrl={onExternalUrl}
      />
     </React.Fragment>
  );
}
/*
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
  onExternalUrl: PropTypes.func,
}; */

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
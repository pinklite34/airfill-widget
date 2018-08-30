import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  Amount,
  BillingCurrency,
  Country,
  OperatorResult,
  OrderOptions,
  OrderResult,
  PaymentStatus,
  Recipient,
} from '../../types';

import { updatePaymentStatus } from '../../actions';
import {
  selectCountry,
  selectNumber,
  selectOperator,
  selectOrder,
  selectPaymentStatus,
} from './../../store';

import Pusher from '../Pusher';
import Spinner from '../UI/Spinner';
import BalanceTooLow from './BalanceTooLow';
import PaymentConfirmed from './PaymentConfirmed';
import PaymentDetected from './PaymentDetected';
import PaymentError from './PaymentError';
import PaymentExpired from './PaymentExpired';
import PaymentMode from './PaymentMode';
import PaymentTwoFactor from './PaymentTwoFactor';
import RefillDelivered from './RefillDelivered';
import RefillFailed from './RefillFailed';

const PUSHER_API_KEY = process.env.PUSHER_API_KEY;

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
    case '2fa_required':
      return PaymentTwoFactor;
    case 'delivered':
      return RefillDelivered;
    case 'balance-too-low':
      return BalanceTooLow;
    case 'partial':
    default:
      return PaymentMode;
  }
};

interface PaymentProps {
  history: History;
  accountBalance: Amount;
  requireAccountBalance: boolean;
  paymentButtons: any[];
  showBTCAddress: boolean;
  refundAddress: string;
  billingCurrency: BillingCurrency;
  orderOptions: OrderOptions;
  operator: OperatorResult;
  order: OrderResult;
  number: Recipient;
  country: Country;
  paymentStatus: PaymentStatus;
  updatePaymentStatus: (...args) => void;
  onExternalUrl: () => void;
  reset: () => void;
}

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
}: PaymentProps) {
  if (!order.result) {
    return <Spinner />;
  }

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
          '2fa_required',
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

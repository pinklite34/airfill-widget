import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import PusherSubscription from '../PusherSubscription';

import ActiveSection from '../UI/ActiveSection';
import Spinner from '../UI/Spinner';

import NewPayment from './NewPayment';
import PaymentDetected from './PaymentDetected';
import PaymentConfirmed from './PaymentConfirmed';
import PartialPayment from './PartialPayment';
import ExpiredPayment from './PaymentExpired';
import RefillFailed from './RefillFailed';
import RefillDelivered from './RefillDelivered';
import BalanceTooLow from './BalanceTooLow';

import {
  selectOrder,
  selectOperator,
  selectNumber,
  selectCountry,
  selectPaymentStatus
} from './../../store';

import { updatePaymentStatus } from '../../actions';

const componentForStatus = status => {
  switch (status) {
    case 'paid':
      return PaymentDetected;
    case 'confirmed':
      return PaymentConfirmed;
    case 'partial':
      return PartialPayment;
    case 'expired':
      return ExpiredPayment;
    case 'failed':
      return RefillFailed;
    case 'delivered':
      return RefillDelivered;
    case 'balance-too-low':
      return BalanceTooLow;
    default:
      return NewPayment;
  }
};

const styles = {
  title: css({
    margin: 0
  })
};

const Payment = ({
  history,
  accountBalance = Number.POSITIVE_INFINITY,
  requireAccountBalance = false,
  refundAddress = '',
  paymentButtons = null,
  showBTCAddress = true,
  billingCurrency = 'XBT',

  order,
  operator,
  number,
  country,
  paymentStatus,

  updatePaymentStatus
}) => {
  if (!order.result) {
    return <Spinner>Loading order status</Spinner>;
  }

  const PaymentComponent = componentForStatus(paymentStatus.status);
  const { orderId, payment: { address } } = order.result;

  return (
    <ActiveSection>
      <h2 {...styles.title}>Payment</h2>
      <PusherSubscription
        channel={[orderId, address].join('-')}
        events={['paid', 'confirmed', 'partial', 'failed', 'delivered']}
        onUpdate={(event, data) =>
          updatePaymentStatus({
            status: event,
            orderId,
            data
          })}
      />
      <PaymentComponent
        history={history}
        order={order.result}
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
      />
    </ActiveSection>
  );
};

export default connect(
  state => ({
    order: selectOrder(state),
    operator: selectOperator(state),
    country: selectCountry(state),
    paymentStatus: selectPaymentStatus(state),
    number: selectNumber(state)
  }),
  {
    updatePaymentStatus
  }
)(Payment);

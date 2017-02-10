import React from 'react';
import {connect} from 'react-redux';
import RefillStep from '../Step';
import PusherSubscription from '../../PusherSubscription';

import Spinner from '../../UI/Spinner';

import NewPayment from './0-New';
import PaymentDetected from './1-Detected';
import PaymentConfirmed from './2-Confirmed';
import PartialPayment from './3-Partial';
import ExpiredPayment from './4-Expired';
import RefillFailed from './5-Failed';
import RefillDelivered from './6-Delivered';
import BalanceTooLow from './7-BalanceTooLow';

import {
  selectOrder,
  selectNumber,
  selectPaymentStatus
} from './../../../store';

import {
  onReset, updatePaymentStatus
} from '../../../actions';


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

const OrderStep = ({
  step,
  expanded,

  accountBalance,
  requireAccountBalance,
  refundAddress,
  paymentButtons,
  showBTCAddress,
  showEmailField,
  billingCurrency,

  order,
  number,
  paymentStatus,

  updatePaymentStatus,
  onReset
}) => {
  const stepProps = {
    step,
    title: 'Pay',
    expanded
  };

  if (!order) {
    return <RefillStep {...stepProps}><Spinner>Loading order status</Spinner></RefillStep>;
  } else if (expanded) {
    const PaymentComponent = componentForStatus(paymentStatus.status);
    const {orderId, payment: {address}} = order.result;

    return (
      <RefillStep {...stepProps} subTitle={expanded && paymentStatus.status ? `Order ID ${orderId}` : null}>
        <PusherSubscription
          channel={[orderId, address].join('-')}
          events={['paid', 'confirmed', 'partial', 'failed', 'delivered']}
          onUpdate={(event, data) =>
            updatePaymentStatus({
              status: event,
              orderId,
              data
            })
          }
        />
        <PaymentComponent
          order={order.result}
          accountBalance={accountBalance}
          requireAccountBalance={requireAccountBalance}
          paymentButtons={paymentButtons}
          paymentStatus={paymentStatus}
          showBTCAddress={showBTCAddress}
          showEmailField={showEmailField}
          refundAddress={refundAddress}
          billingCurrency={billingCurrency}
          number={number}
          onReset={onReset}
        />
      </RefillStep>
    );
  }

  return <RefillStep {...stepProps} />;
};

export default connect((state) => ({
  order: selectOrder(state),
  paymentStatus: selectPaymentStatus(state),
  number: selectNumber(state)
}), {
  updatePaymentStatus,
  onReset
})(OrderStep);

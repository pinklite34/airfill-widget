import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { PaymentButton } from '../../types';

import { selectPaymentMethod } from '../../store';

import Collapsed from '../UI/Collapsed';

interface PaymentCollapsedProps extends RouteComponentProps<{}> {
  selectedMethod: PaymentButton;
}

function PaymentCollapsed({ selectedMethod, history }: PaymentCollapsedProps) {
  const icon = selectedMethod && selectedMethod.icon;
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectPayment')}
      type="payment"
      icon={icon}
      title={selectedMethod && selectedMethod.title}
    />
  );
}

export default connect(state => ({
  selectedMethod: selectPaymentMethod(state),
}))(withRouter(PaymentCollapsed));

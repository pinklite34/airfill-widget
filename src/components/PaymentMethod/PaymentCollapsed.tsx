import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import { Operator, PaymentButton } from '../../lib/prop-types';
import { selectPaymentMethod, selectSelectedOperator } from '../../store';
import Collapsed from '../UI/Collapsed';

interface PaymentCollapsedProps {
  operator: Operator;
  history: History;
  selectedMethod: PaymentButton;
}

function PaymentCollapsed({
  operator,
  history,
  selectedMethod = {},
}: PaymentCollapsedProps) {
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

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    selectedMethod: selectPaymentMethod(state),
  }))
)(PaymentCollapsed);

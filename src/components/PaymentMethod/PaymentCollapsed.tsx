import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectPaymentMethod } from '../../store';
import { historyProp, operatorProp } from '../../lib/prop-types';

function PaymentCollapsed({ operator, history, selectedMethod = {} }: any) {
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

/* PaymentCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
  selectedMethod: PropTypes.object,
}; */

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    selectedMethod: selectPaymentMethod(state),
  }))
)(PaymentCollapsed);

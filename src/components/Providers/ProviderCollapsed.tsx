import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import { trackProductEvent } from '../../actions/analytics-actions';
import { Operator, OrderResult } from '../../lib/prop-types';
import { selectOrder, selectSelectedOperator } from '../../store';
import Collapsed from '../UI/Collapsed';

interface ProviderCollapsedProps {
  order: OrderResult;
  operator: Operator;
  history: History;
  trackProductEvent: typeof trackProductEvent;
}

function ProviderCollapsed({
  order,
  operator,
  history,
  trackProductEvent,
}: ProviderCollapsedProps) {
  return (
    <Collapsed
      onClick={() => {
        if (order && order.result) {
          trackProductEvent('Product Removed', order.result.operator);
        }
        history.push('/refill/selectProvider');
      }}
      type="provider"
      icon={operator && operator.logoImage}
      title={operator && operator.name}
    />
  );
}

export default compose(
  withRouter,
  connect(
    state => ({
      order: selectOrder(state),
      operator: selectSelectedOperator(state),
    }),
    { trackProductEvent }
  )
)(ProviderCollapsed);

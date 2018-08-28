import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { Operator, OrderResult } from '../../types';

import { trackProductEvent } from '../../actions/analytics-actions';
import { selectOrder, selectSelectedOperator } from '../../store';

import Collapsed from '../UI/Collapsed';

interface ProviderCollapsedProps extends RouteComponentProps<{}> {
  order: OrderResult;
  operator: Operator;
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

export default connect(
  state => ({
    order: selectOrder(state),
    operator: selectSelectedOperator(state),
  }),
  { trackProductEvent }
)(withRouter(ProviderCollapsed));

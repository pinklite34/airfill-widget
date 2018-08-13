import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import { Operator } from '../../lib/prop-types';
import { selectSelectedOperator } from '../../store';
import Collapsed from '../UI/Collapsed';

interface ProviderCollapsedProps {
  operator: Operator;
  history: History;
}

function ProviderCollapsed({ operator, history }: ProviderCollapsedProps) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectProvider')}
      type="provider"
      icon={operator && operator.logoImage}
      title={operator && operator.name}
    />
  );
}

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
  }))
)(ProviderCollapsed);

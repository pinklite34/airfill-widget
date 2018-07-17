import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator } from '../../store';
import { historyProp, operatorProp } from '../../lib/prop-types';

function ProviderCollapsed({ operator, history }) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectProvider')}
      type="provider"
      icon={operator.logoImage}
      title={operator.name}
    />
  );
}

ProviderCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
};

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
  }))
)(ProviderCollapsed);

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectNumber } from '../../store';
import { historyProp, operatorProp, numberProp } from '../../lib/prop-types';

import { getRecipientIcon } from '../../lib/icon-picker';

function RecipientCollapsed({ operator, history, number }) {
  const Icon = getRecipientIcon(operator);
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectRecipient')}
      type="recipient"
      icon={<Icon />}
      title={number}
    />
  );
}

RecipientCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
  number: numberProp,
};

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    number: selectNumber(state),
  }))
)(RecipientCollapsed);

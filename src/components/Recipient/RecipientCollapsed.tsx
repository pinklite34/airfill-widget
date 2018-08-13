import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import { getRecipientIcon } from '../../lib/icon-picker';
import { Operator, OperatorResult, Recipient } from '../../lib/prop-types';
import { selectNumber, selectSelectedOperator } from '../../store';
import Collapsed from '../UI/Collapsed';

interface RecipientCollapsedProps {
  operator: Operator;
  history: History;
  number: Recipient;
}

function RecipientCollapsed({
  operator,
  history,
  number,
}: RecipientCollapsedProps) {
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

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    number: selectNumber(state),
  }))
)(RecipientCollapsed);

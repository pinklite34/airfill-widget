import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { getRecipientIcon } from '../../lib/icon-picker';
import { Operator, OperatorResult, Recipient } from '../../types';
import { selectNumber, selectSelectedOperator } from '../../store';
import Collapsed from '../UI/Collapsed';

interface RecipientCollapsedProps extends RouteComponentProps<{}> {
  operator: Operator;
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

export default connect(state => ({
  operator: selectSelectedOperator(state),
  number: selectNumber(state),
}))(withRouter(RecipientCollapsed));

import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';

import { Amount, OperatorResult } from '../../types';

import { selectAmount, selectOperator } from '../../store';
import Collapsed from '../UI/Collapsed';
import Icon from './icon.svg';

interface AmountCollapsedProps {
  amount: Amount;
  operator: OperatorResult;
  history: History;
}

function AmountCollapsed({ history, amount, operator }: AmountCollapsedProps) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectAmount')}
      type="amount"
      icon={<Icon />}
      title={`${amount} ${operator.result && operator.result.currency}`}
    />
  );
}

export default connect(state => ({
  amount: selectAmount(state),
  operator: selectOperator(state),
}))(AmountCollapsed);

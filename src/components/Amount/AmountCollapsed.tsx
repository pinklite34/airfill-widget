import * as React from 'react';
import { connect } from 'react-redux';

import { selectAmount, selectOperator } from '../../store';
import {
  operatorResultProp,
  historyProp,
  amountProp,
} from '../../lib/prop-types';

import Icon from './icon.svg';
import Collapsed from '../UI/Collapsed';

function AmountCollapsed({ history, amount, operator }) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectAmount')}
      type="amount"
      icon={<Icon />}
      title={`${amount} ${operator.result && operator.result.currency}`}
    />
  );
}

/* AmountCollapsed.propTypes = {
  history: historyProp,
  amount: amountProp,
  operator: operatorResultProp,
};
 */
export default connect(state => ({
  amount: selectAmount(state),
  operator: selectOperator(state),
}))(AmountCollapsed);

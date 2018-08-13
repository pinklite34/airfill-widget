import * as React from 'react';
import { connect } from 'react-redux';

import {
  amountProp,
  historyProp,
  operatorResultProp,
} from '../../lib/prop-types';
import { selectAmount, selectOperator } from '../../store';

import Collapsed from '../UI/Collapsed';
import Icon from './icon.svg';

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

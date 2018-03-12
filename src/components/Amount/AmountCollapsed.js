import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { selectAmount, selectOperator } from '../../store';
import {
  operatorResultProp,
  historyProp,
  amountProp,
} from '../../lib/prop-types';

import Icon from './icon.svg';
import Collapsed from '../UI/Collapsed';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  icon: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    marginRight: 30,
    marginLeft: 14,
    '@media(max-width: 460px)': {
      marginRight: 14,
      marginLeft: 0,
    },
  }),
};

function AmountCollapsed({ history, amount, operator }) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectAmount')}
      type="amount"
    >
      <div {...styles.container}>
        <div {...styles.icon}>
          <Icon />
        </div>
        {amount} {operator.result && operator.result.currency}
      </div>
    </Collapsed>
  );
}

AmountCollapsed.propTypes = {
  history: historyProp,
  amount: amountProp,
  operator: operatorResultProp,
};

export default connect(state => ({
  amount: selectAmount(state),
  operator: selectOperator(state),
}))(AmountCollapsed);

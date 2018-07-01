import React from 'react';
import { connect } from 'react-redux';
import { css } from 'react-emotion';

import { selectAmount, selectOperator } from '../../store';
import {
  operatorResultProp,
  historyProp,
  amountProp,
} from '../../lib/prop-types';

import Icon from './icon.svg';
import Collapsed from '../UI/Collapsed';

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  icon: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    margin-right: 30px;
    margin-left: 14px;

    @media (max-width: 460px) {
      margin-right: 14px;
      margin-left: 0px;
    }
  `,
};

function AmountCollapsed({ history, amount, operator }) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectAmount')}
      type="amount">
      <div className={styles.container}>
        <div className={styles.icon}>
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

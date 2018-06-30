import React from 'react';
import { css } from 'react-emotion';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectNumber } from '../../store';
import { historyProp, operatorProp, numberProp } from '../../lib/prop-types';

import { getRecipientIcon } from '../../lib/icon-picker';

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
  logo: css`
    max-width: 40px;
    max-height: 30px;
  `,
};

function RecipientCollapsed({ operator, history, number }) {
  const Icon = getRecipientIcon(operator);
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectRecipient')}
      type="recipient">
      {operator && (
        <div className={styles.container}>
          <div className={styles.icon}>
            <Icon />
          </div>
          {number}
        </div>
      )}
    </Collapsed>
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

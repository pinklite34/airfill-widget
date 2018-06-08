import React from 'react';
import { css } from 'glamor';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectNumber } from '../../store';
import { historyProp, operatorProp, numberProp } from '../../lib/prop-types';

import { getRecipientIcon } from '../../lib/icon-picker';

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
  logo: css({
    maxWidth: 40,
    maxHeight: 30,
  }),
};

function RecipientCollapsed({ operator, history, number }) {
  const Icon = getRecipientIcon(operator);
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectRecipient')}
      type="recipient">
      {operator && (
        <div {...styles.container}>
          <div {...styles.icon}>
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

import React from 'react';
import { css } from 'glamor';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectNumber } from '../../store';
import {
  historyProp,
  darkenProp,
  operatorProp,
  numberProp,
} from '../../lib/prop-types';

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

function ReceipentCollapsed({ operator, history, number, darken }) {
  return (
    <Collapsed
      darken={darken}
      onClick={() => history.push('/refill/selectReceipent')}
      type="receipent">
      {operator && (
        <div {...styles.container}>
          <div {...styles.icon} />
          {number}
        </div>
      )}
    </Collapsed>
  );
}

ReceipentCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
  darken: darkenProp,
  number: numberProp,
};

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    number: selectNumber(state),
  }))
)(ReceipentCollapsed);

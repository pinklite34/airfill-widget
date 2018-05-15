import React from 'react';
import { css } from 'glamor';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator } from '../../store';
import { historyProp, operatorProp } from '../../lib/prop-types';

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

function ProviderCollapsed({ operator, history }) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectProvider')}
      type="provider">
      {operator && (
        <div {...styles.container}>
          <div {...styles.icon}>
            <img
              src={operator.logoImage}
              alt={operator.name}
              {...styles.logo}
            />
          </div>
          {operator.name}
        </div>
      )}
    </Collapsed>
  );
}

ProviderCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
};

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
  }))
)(ProviderCollapsed);

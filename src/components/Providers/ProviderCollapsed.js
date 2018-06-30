import React from 'react';
import { css } from 'react-emotion';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator } from '../../store';
import { historyProp, operatorProp } from '../../lib/prop-types';

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
      margin-right: 14;
      margin-left: 0px;
    }
  `,
  logo: css`
    max-width: 40px;
    max-height: 30px;
  `,
};

function ProviderCollapsed({ operator, history }) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectProvider')}
      type="provider">
      {operator && (
        <div className={styles.container}>
          <div className={styles.icon}>
            <img
              src={operator.logoImage}
              alt={operator.name}
              className={styles.logo}
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

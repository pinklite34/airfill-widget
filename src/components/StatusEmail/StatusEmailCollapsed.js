import React from 'react';
import { css } from 'react-emotion';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectEmail } from '../../store';
import { historyProp, operatorProp, emailProp } from '../../lib/prop-types';

import Icon from '../../assets/email.svg';

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

function StautsEmailCollapsed({ operator, history, email }) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectStatusEmail')}
      type="email">
      {operator && (
        <div className={styles.container}>
          <div className={styles.icon}>
            <Icon />
          </div>
          {email.value}
        </div>
      )}
    </Collapsed>
  );
}

StautsEmailCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
  email: emailProp,
};

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    email: selectEmail(state),
  }))
)(StautsEmailCollapsed);

import React from 'react';
import { css } from 'glamor';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectEmail } from '../../store';
import { historyProp, operatorProp, emailProp } from '../../lib/prop-types';

import Icon from '../../assets/email.svg';

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

function StautsEmailCollapsed({ operator, history, email }) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectStatusEmail')}
      type="email">
      {operator && (
        <div {...styles.container}>
          <div {...styles.icon}>
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

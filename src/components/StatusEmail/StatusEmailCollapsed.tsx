import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectEmail } from '../../store';
import { historyProp, operatorProp, emailProp } from '../../lib/prop-types';

import Icon from '../../assets/email.svg';

function StautsEmailCollapsed({ operator, history, email }) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectStatusEmail')}
      type="email"
      icon={<Icon />}
      title={email.value}
    />
  );
}
/*
StautsEmailCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
  email: emailProp,
}; */

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    email: selectEmail(state),
  }))
)(StautsEmailCollapsed);

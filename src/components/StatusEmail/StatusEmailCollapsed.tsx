import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import Icon from '../../assets/email.svg';
import { Email } from '../../lib/prop-types';
import { selectEmail, selectSelectedOperator } from '../../store';
import Collapsed from '../UI/Collapsed';

interface StatusEmailCollapsedProps {
  history: History;
  email: Email;
}

function StautsEmailCollapsed({ history, email }: StatusEmailCollapsedProps) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectStatusEmail')}
      type="email"
      icon={<Icon />}
      title={email.value}
    />
  );
}

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    email: selectEmail(state),
  }))
)(StautsEmailCollapsed);

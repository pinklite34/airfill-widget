import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { Email } from '../../types';

import { selectEmail, selectSelectedOperator } from '../../store';

import Collapsed from '../UI/Collapsed';

import Icon from '../../assets/email.svg';

interface StatusEmailCollapsedProps extends RouteComponentProps<{}> {
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

export default connect(state => ({
  operator: selectSelectedOperator(state),
  email: selectEmail(state),
}))(withRouter(StautsEmailCollapsed));

import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { Email } from '../../types';

import { selectEmail, selectSelectedOperator } from '../../store';

import Collapsed from '../UI/Collapsed';

import Icon from '../../assets/email.svg';

interface EmailCollapsedProps extends RouteComponentProps<{}> {
  email: Email;
}

function EmailCollapsed({ history, email }: EmailCollapsedProps) {
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectEmail')}
      type="email"
      icon={<Icon />}
      title={email.value}
    />
  );
}

export default connect(state => ({
  operator: selectSelectedOperator(state),
  email: selectEmail(state),
}))(withRouter(EmailCollapsed));

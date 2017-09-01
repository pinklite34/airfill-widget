import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { selectOperator } from '../../store';

import CollapsedSection from '../UI/CollapsedSection';

const Collapsed = ({ operator, history }) => (
  <CollapsedSection onClick={() => history.push('/selectProvider')} type="provider">
    {operator && operator.result.name}
  </CollapsedSection>
);

export default withRouter(connect(state => ({
  operator: selectOperator(state)
}))(Collapsed));

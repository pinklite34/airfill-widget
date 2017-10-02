import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { selectOperator } from '../../store';

import CollapsedSection from '../UI/CollapsedSection';

const Collapsed = ({ operator, history, darken }) => (
  <CollapsedSection
    darken={darken}
    onClick={() => history.push('/selectProvider')}
    type="provider"
  >
    {operator.result && operator.result.name}
  </CollapsedSection>
);

export default withRouter(
  connect(state => ({
    operator: selectOperator(state)
  }))(Collapsed)
);

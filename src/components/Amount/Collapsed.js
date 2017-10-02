import React from 'react';
import { connect } from 'react-redux';
import { selectAmount, selectOperator } from '../../store';
import CollapsedSection from '../UI/CollapsedSection';

const Collapsed = ({ history, amount, operator }) => (
  <CollapsedSection onClick={() => history.push('/selectAmount')} type="amount">
    {operator.result.name} {amount} {operator.result.currency}
  </CollapsedSection>
);

export default connect(state => ({
  amount: selectAmount(state),
  operator: selectOperator(state)
}))(Collapsed);

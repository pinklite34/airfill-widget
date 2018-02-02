import React from 'react';
import { connect } from 'react-redux';
import { selectAmount, selectOperator } from '../../store';
import CollapsedSection from '../UI/CollapsedSection';
import { css } from 'glamor';

const styles = {
  container: css({
    marginLeft: '78px'
  })
};

const Collapsed = ({ history, amount, operator }) => (
  <CollapsedSection
    onClick={() => history.push('/refill/selectAmount')}
    type="amount"
  >
    <div {...styles.container}>
      {amount} {operator.result.currency}
    </div>
  </CollapsedSection>
);

export default connect(state => ({
  amount: selectAmount(state),
  operator: selectOperator(state)
}))(Collapsed);

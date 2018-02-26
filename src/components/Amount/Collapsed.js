import React from 'react';
import { connect } from 'react-redux';
import { selectAmount, selectOperator } from '../../store';
import CollapsedSection from '../UI/CollapsedSection';
import { css } from 'glamor';
import Icon from './icon.svg';

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
};

const Collapsed = ({ history, amount, operator }) => (
  <CollapsedSection
    onClick={() => history.push('/refill/selectAmount')}
    type="amount"
  >
    <div {...styles.container}>
      <div {...styles.icon}>
        <Icon />
      </div>
      {amount} {operator.result && operator.result.currency}
    </div>
  </CollapsedSection>
);

export default connect(state => ({
  amount: selectAmount(state),
  operator: selectOperator(state),
}))(Collapsed);

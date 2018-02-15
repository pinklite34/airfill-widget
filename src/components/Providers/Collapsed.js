import React from 'react';
import { css } from 'glamor';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { selectSelectedOperator } from '../../store';

import CollapsedSection from '../UI/CollapsedSection';

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
  }),
  logo: css({
    maxWidth: 40,
    maxHeight: 30,
  }),
};

const Collapsed = ({ operator, history, darken }) => (
  <CollapsedSection
    darken={darken}
    onClick={() => history.push('/refill/selectProvider')}
    type="provider"
  >
    {operator && (
      <div {...styles.container}>
        <div {...styles.icon}>
          <img src={operator.logoImage} alt={operator.name} {...styles.logo} />
        </div>
        {operator.name}
      </div>
    )}
  </CollapsedSection>
);

export default withRouter(
  connect(state => ({
    operator: selectSelectedOperator(state),
  }))(Collapsed)
);

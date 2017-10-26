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
    alignItems: 'center'
  }),
  icon: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    marginRight: 12
  }),
  logo: css({
    maxWidth: 24,
    maxHeight: 18
  }),
  content: css({
    fontWeight: 500,
    fontSize: 14
  })
};

const Collapsed = ({ operator, history, darken }) => (
  <CollapsedSection
    darken={darken}
    onClick={() => history.push('/selectProvider')}
    type="provider"
  >
    {operator && (
      <div {...styles.container}>
        <div {...styles.icon}>
          <img src={operator.logoImage} alt={operator.name} {...styles.logo} />
        </div>
        <div {...styles.content}>{operator.name}</div>
      </div>
    )}
  </CollapsedSection>
);

export default withRouter(
  connect(state => ({
    operator: selectSelectedOperator(state)
  }))(Collapsed)
);

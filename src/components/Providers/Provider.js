import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';
import { setOperator } from '../../actions';

import More from './more.svg';

const styles = {
  container: css({
    width: 'auto',
    flex: '0 1 128px',
    padding: 12,
    margin: 6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 1.4,
    cursor: 'pointer'
  }),
  logo: css({
    maxHeight: 42,
    maxWidth: 88,
    marginBottom: 6,
    display: 'block'
  })
};

export const ShowAll = ({ onClick, count }) => (
  <Card {...styles.container} onClick={onClick}>
    <div {...styles.logo}>
      <More fill="#777777" width="42px" height="42px" />
    </div>
    <div>
      Show all <strong>{count}</strong> providers
    </div>
  </Card>
);

const Provider = ({ data, setOperator, history }) => (
  <Card
    {...styles.container}
    onClick={() => {
      setOperator(data.slug);
      history.push('/selectAmount');
    }}
  >
    <img src={data.logoImage} alt={data.name} {...styles.logo} />
    <div>{data.name}</div>
  </Card>
);

export default withRouter(
  connect(null, {
    setOperator
  })(Provider)
);

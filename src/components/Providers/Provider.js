import React from 'react';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';

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
  logoWrapper: css({
    height: 42,
    width: 88,
    marginBottom: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  logo: css({
    maxHeight: 42,
    maxWidth: 88,
    display: 'block'
  })
};

export const ShowAll = ({ onClick, count }) => (
  <Card {...styles.container} onClick={onClick}>
    <div {...styles.logoWrapper}>
      <More fill="#777777" width="42px" height="42px" />
    </div>
    <div>
      Show all <strong>{count}</strong> providers
    </div>
  </Card>
);

const Provider = ({ data, onSelect }) => (
  <Card {...styles.container} onClick={onSelect}>
    <div {...styles.logoWrapper}>
      <img src={data.logoImage} alt={data.name} {...styles.logo} />
    </div>
    <div>{data.name}</div>
  </Card>
);

export default Provider;

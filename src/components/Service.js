import React from 'react';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';

const styles = {
  container: css({
    width: 'auto',
    flex: '0 1 128px',
    padding: 12,
    margin: 6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }),
  logo: css({
    maxHeight: 42,
    maxWidth: 88,
    marginBottom: 6,
    display: 'block'
  })
};

const Service = ({ data }) => (
  <Card {...styles.container}>
    <img src={data.logoImage} alt={data.name} {...styles.logo} />
    <div>{data.name}</div>
  </Card>
);

export default Service;

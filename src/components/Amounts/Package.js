import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';
import { setAmount } from '../../actions'

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
    textAlign: 'center',
    cursor: 'pointer'
  }),
  name: css({
    fontSize: 20,
    fontWeight: 700
  }),
  price: css({
    fontSize: 12,
    color: '#777777'
  })
};

const Package = ({ name, btcPrice }) => (
  <Card {...styles.container}>
    <div {...styles.name}>{name}</div>
    <div {...styles.price}>{btcPrice} BTC</div>
  </Card>
);

export default connect(null, {
  setAmount
})(Package);

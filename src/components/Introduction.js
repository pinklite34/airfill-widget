import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { selectCountryCode } from '../store';

import NumberInput from './UI/NumberInput';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  head: css({
    margin: '20px 0'
  }),
  title: css({
    margin: 0,
    fontSize: 16,
    fontWeight: 700
  }),
  subtitle: css({
    fontSize: 12,
    fontWeight: 700,
    color: 'rgba(255, 255, 255, 0.8)',
    width: 260,
    marginTop: 8
  }),
  description: css({
    marginTop: 8,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    width: 300,
    lineHeight: 1.5,
    fontWeight: 500
  })
};

const Introduction = ({ branded, country }) =>
  <div {...styles.container}>
    {branded
      ? <div {...styles.head}>
          <h2 {...styles.title}>Send Global Top Ups With Bitcoin</h2>
          <div {...styles.subtitle}>Trusted by More Than 500 000 People</div>
        </div>
      : <div {...styles.head}>
          <h2 {...styles.title}>Top Up Anything With Bitcoin</h2>
        </div>}
    <NumberInput country={country} />
    <div {...styles.description}>
      Enter a phone number to see available services or select a provider below
      for more information
    </div>
  </div>;

export default connect(state => ({
  country: selectCountryCode(state)
}))(Introduction);

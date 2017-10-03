import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { selectCountryCode, selectNumber } from '../store';
import { lookupNumber } from '../actions';

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

class Introduction extends Component {
  state = {
    isLoading: false,
    error: null
  };

  lookupNumber = () => {
    this.setState({
      isLoading: true
    });

    const { lookupNumber, history, number } = this.props;

    lookupNumber(number)
      .then(() =>
        history.push('/selectProvider', {
          suggested: true
        })
      )
      .catch(error =>
        this.setState({
          isLoading: false,
          error
        })
      );
  };

  render() {
    const { branded, country } = this.props;
    const { isLoading, error } = this.state;
    return (
      <div {...styles.container}>
        {branded ? (
          <div {...styles.head}>
            <h2 {...styles.title}>Send Global Top Ups With Bitcoin</h2>
            <div {...styles.subtitle}>Trusted by More Than 500 000 People</div>
          </div>
        ) : (
          <div {...styles.head}>
            <h2 {...styles.title}>Top Up Anything With Bitcoin</h2>
          </div>
        )}
        <NumberInput
          loading={isLoading}
          country={country}
          onSubmit={this.lookupNumber}
        />
        {error ? (
          <div {...styles.error}>{error.message}</div>
        ) : (
          <div {...styles.description}>
            Enter a phone number to see available services or select a provider
            below for more information
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    country: selectCountryCode(state),
    number: selectNumber(state)
  }),
  {
    lookupNumber
  }
)(Introduction);

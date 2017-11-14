import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { selectNumber } from '../store';
import { lookupNumber } from '../actions';

import ComboInput from './UI/ComboInput';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  head: css({
    marginBottom: 20
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
    width: '100%',
    maxWidth: 300,
    lineHeight: 1.5,
    fontWeight: 500
  }),
  error: css({
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    color: '#333',
    width: '100%',
    maxWidth: 400,
    lineHeight: 1.5,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
    borderRadius: '0 0 2px 2px',
    marginTop: -2,
    position: 'relative',
    zIndex: -1
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
    const { branded, history } = this.props;
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
        <ComboInput
          history={history}
          loading={isLoading}
          onSubmit={this.lookupNumber}
        />
        {error ? (
          <div {...styles.error}>The number lookup failed with the error: {error.message || error}</div>
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
    number: selectNumber(state)
  }),
  {
    lookupNumber
  }
)(Introduction);

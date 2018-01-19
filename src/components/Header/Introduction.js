import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { selectNumber, selectNumberLookup } from '../../store';
import { lookupNumber, resetNumberLookup } from '../../actions';

import ComboInput from '../UI/ComboInput';
import Info from '../UI/info.svg';

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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'initial',
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    paddingTop: 10,
    color: '#333',
    width: '100%',
    maxWidth: 400,
    lineHeight: 1.5,
    boxShadow:
      '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
    borderRadius: '0 0 2px 2px',
    marginTop: -2,
    position: 'relative',
    zIndex: -1
  }),
  errorIcon: css({
    marginRight: 8,
    fill: '#555555',
    width: 24,
    height: 24,
    flex: '0 0 auto'
  })
};

class Introduction extends Component {
  componentDidMount() {
    this.props.resetNumberLookup();
  }

  lookupNumber = () => {
    const { lookupNumber, history, number } = this.props;

    lookupNumber(number).then(
      result => history.push('/refill/selectProvider'),
      () => null // No uncaught promise rejections
    );
  };

  render() {
    const { branded, history, numberLookup } = this.props;
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
          loading={numberLookup.isLoading}
          onSubmit={this.lookupNumber}
        />
        {numberLookup.error ? (
          <div {...styles.error}>
            <Info {...styles.errorIcon} />
            <div>{numberLookup.error.message || numberLookup.error}</div>
          </div>
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
    number: selectNumber(state),
    numberLookup: selectNumberLookup(state)
  }),
  {
    lookupNumber,
    resetNumberLookup
  }
)(Introduction);
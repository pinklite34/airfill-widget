import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'react-emotion';

import { selectNumber, selectNumberLookup } from '../../store';
import { lookupNumber, resetNumberLookup } from '../../actions';
import {
  historyProp,
  fnProp,
  numberProp,
  numberLookupProp,
} from '../../lib/prop-types';

import Info from '../UI/info.svg';

import ComboInput from '../UI/ComboInput';

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  head: css`
    margin-bottom: 20px;
  `,
  title: css`
    margin: 0;
    font-size: 16px;
    font-weight: 700;
  `,
  subtitle: css`
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
    width: 260px;
    margin-top: 8px;
  `,
  description: css`
    margin-top: 8px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);
    width: 100%;
    max-width: 300px;
    line-height: 1.5;
    font-weight: 500;
  `,
  error: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: initial;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px;
    padding-top: 10px;
    color: #333;
    width: 100%;
    max-width: 400px;
    line-height: 1.5;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 0 0 2px 2px;
    margin-top: -2px;
    position: relative;
    z-index: -1;
  `,
  errorIcon: css`
    margin-right: 8px;
    fill: #555555;
    width: 24px;
    height: 24px;
    flex: 0 0 auto;
  `,
};

class HeaderIntroduction extends PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool,
    resetNumberLookup: fnProp,
    lookupNumber: fnProp,
    numberLookup: numberLookupProp,
    history: historyProp,
    number: numberProp,
    branded: PropTypes.bool,
  };

  state = {
    error: null,
  };

  componentDidMount() {
    this.props.resetNumberLookup();
  }

  lookupNumber = () => {
    const { lookupNumber, history, number } = this.props;

    if (number.startsWith('+')) {
      this.setState({ error: null }, () =>
        lookupNumber(number).then(
          result => history.push('/refill/selectProvider'),
          () => null // No uncaught promise rejections
        )
      );
    } else {
      this.setState({
        error: 'A phone country code is required (example: +66)',
      });
    }
  };

  render() {
    const { isMobile, branded, history, numberLookup } = this.props;
    const { error } = this.state;

    return (
      <div className={styles.container}>
        {branded ? (
          <div className={styles.head}>
            <h2 className={styles.title}>Send Global Top Ups With Bitcoin</h2>
            <div className={styles.subtitle}>
              Trusted by More Than 500 000 People
            </div>
          </div>
        ) : (
          <div className={styles.head}>
            <h2 className={styles.title}>Top Up Anything With Bitcoin</h2>
          </div>
        )}
        <ComboInput
          countryOnly={isMobile}
          history={history}
          loading={numberLookup.isLoading}
          onSubmit={this.lookupNumber}
        />
        {error || numberLookup.error ? (
          <div className={styles.error}>
            <Info className={styles.errorIcon} />
            {error || (
              <div>
                {'An error occured'}
                <br />
                ({numberLookup.error.message || numberLookup.error})
              </div>
            )}
          </div>
        ) : (
          <div className={styles.description}>
            {`Enter ${
              isMobile ? 'your country' : 'a phone number'
            } to see available services or select a service below for more information`}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    number: selectNumber(state),
    numberLookup: selectNumberLookup(state),
  }),
  {
    lookupNumber,
    resetNumberLookup,
  }
)(HeaderIntroduction);

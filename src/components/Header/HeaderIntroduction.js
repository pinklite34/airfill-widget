import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { selectNumber, selectNumberLookup } from '../../store';
import { lookupNumber, resetNumberLookup } from '../../actions';
import {
  historyProp,
  fnProp,
  numberProp,
  numberLookupProp,
  configProp,
} from '../../lib/prop-types';

import Text from '../UI/Text';
import ComboInput from '../UI/ComboInput';

import Info from '../UI/info.svg';
import theme from '../../theme';
import Flex from '../UI/Flex';
import { startsWith, capitalizeFirst } from '../../lib/string';

const Error = styled('div')`
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
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 0 0 2px 2px;
  margin-top: -2px;
  position: relative;
  z-index: -1;
  box-sizing: border-box;
`;

const ErrorIcon = styled(Info)`
  margin-right: 8px;
  fill: #555555;
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
`;

class HeaderIntroduction extends PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool,
    resetNumberLookup: fnProp,
    lookupNumber: fnProp,
    numberLookup: numberLookupProp,
    history: historyProp,
    number: numberProp,
    branded: PropTypes.bool,
    config: configProp,
  };

  state = {
    error: null,
  };

  componentDidMount() {
    this.props.resetNumberLookup();
  }

  lookupNumber = () => {
    const { lookupNumber, history, number } = this.props;

    if (startsWith(number, '+')) {
      this.setState({ error: null }, () =>
        lookupNumber(number).then(
          result => history.push('/refill/selectProvider'),
          () => null // No uncaught promise rejections
        )
      );
    } else {
      this.setState({
        error: {
          id: 'introduction.error.countrycode',
          children: 'A phone country code is required (example: +66)',
        },
      });
    }
  };

  render() {
    const { isMobile, branded, history, numberLookup, config } = this.props;
    const { error } = this.state;
    const lookupError =
      (numberLookup.error && numberLookup.error.message) || numberLookup.error;
    const displayedError = error || lookupError;

    const coin = capitalizeFirst(config.coin || 'Bitcoin');

    return (
      <Flex centered>
        {branded ? (
          <Flex centered padding="0 0 12px">
            <Text
              type="h1"
              centered
              tight
              id="introduction.title.branded"
              size="16px"
              weight={700}
              color={theme.white}>
              Send Global Top Ups With {{ coin }}
            </Text>
            <Text
              type="h3"
              centered
              size="12px"
              margin="8px 0"
              id="introduction.subtitle"
              color={'rgba(255, 255, 255, 0.8)'}>
              Trusted by More Than 500 000 People
            </Text>
          </Flex>
        ) : (
          <Flex centered padding="0 0 20px">
            <Text
              type="h1"
              centered
              tight
              id="introduction.title.unbranded"
              color={theme.white}>
              Top Up Anything With {{ coin }}
            </Text>
          </Flex>
        )}
        <ComboInput
          countryOnly={isMobile}
          history={history}
          loading={numberLookup.isLoading}
          onSubmit={this.lookupNumber}
        />
        {displayedError ? (
          <Error>
            <ErrorIcon />
            {displayedError.id ? (
              <Text type="p" size="14px" {...displayedError} />
            ) : (
              <Text type="p" size="14px">
                {displayedError}
              </Text>
            )}
          </Error>
        ) : (
          <Text
            type="p"
            centered
            padding="20px 0 0"
            tight
            width="300px"
            id={`widget.introduction.description.${
              isMobile ? 'country' : 'phone'
            }`}
            color={'rgba(255, 255, 255, 0.9)'}>
            Enter {isMobile ? 'your country' : 'a phone number'} to see
            available services or select a service below for more information
          </Text>
        )}
      </Flex>
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

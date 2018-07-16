import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { transProp } from '../../lib/prop-types';

import Text from './Text';

import ErrorIcon from './error-small.svg';

const Container = styled('div')`
  background-color: #e1283c;
  margin: 0;
  padding: 16px;
  color: #fff;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 10;
`;

const Icon = styled(ErrorIcon)`
  margin-right: 16px;
  fill: ${p => p.theme.white};
`;

export default function ErrorBanner({ text }) {
  return (
    <Container>
      <Icon />
      {text && text.id ? <Text {...text} /> : text}
    </Container>
  );
}

ErrorBanner.propTypes = {
  text: PropTypes.oneOfType([transProp, PropTypes.string]).isRequired,
};

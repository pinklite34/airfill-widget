import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

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

const styles = {
  icon: css`
    margin-right: 16px;
  `,
};

const ErrorBanner = ({ children }) => (
  <Container>
    <ErrorIcon fill="#fff" className={styles.icon} />
    <div>{children}</div>
  </Container>
);

ErrorBanner.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ErrorBanner;

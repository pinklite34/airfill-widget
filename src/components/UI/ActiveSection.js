import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { transProp } from '../../lib/prop-types';

import ErrorBanner from './ErrorBanner';

const Container = styled('div')`
  background-color: #fafafa;
`;

const Content = styled('div')`
  padding: ${p => p.padding};
`;

const NextContainer = styled('div')`
  background-color: #fafafa;
  padding: 16px;
  border-top: ${p => p.theme.bd.primary};
`;

export default function ActiveSection({
  children,
  renderNextButton,
  padding,
  error,
  ...props
}) {
  return (
    <Container {...props}>
      {error && <ErrorBanner text={error} />}
      <Content padding={padding}>{children}</Content>
      {renderNextButton && <NextContainer>{renderNextButton()}</NextContainer>}
    </Container>
  );
}

ActiveSection.propTypes = {
  children: PropTypes.node,
  renderNextButton: PropTypes.func,
  padding: PropTypes.string,
  error: PropTypes.oneOfType([transProp, PropTypes.string]).isRequired,
};

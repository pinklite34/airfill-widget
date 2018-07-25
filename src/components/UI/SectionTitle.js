import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Text from './Text';
import { transProp } from '../../lib/prop-types';

const Container = styled('div')`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin: ${p => (p.tight ? 0 : '0 0 8px 8px')};
  color: ${p => p.theme.tx.secondary};
`;

export default function SectionTitle({ text, className, children, ...props }) {
  return (
    <Container className={className} {...props}>
      {text && text.id ? <Text {...text} /> : text}
      {children}
    </Container>
  );
}

SectionTitle.propTypes = {
  text: PropTypes.oneOfType([transProp, PropTypes.string]).isRequired,
  title: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

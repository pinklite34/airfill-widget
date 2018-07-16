import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Text from './Text';
import { transProp } from '../../lib/prop-types';

const Container = styled('div')`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  margin-left: 8px;
  color: #777;
`;

export default function SectionTitle({ text, className, children, ...props }) {
  console.log('-------------------- SectionTitle --> ', text);
  return (
    <Container className={className} {...props}>
      {text && text.id ? <Text {...text} /> : text}
      {children}
    </Container>
  );
}

SectionTitle.propTypes = {
  text: PropTypes.oneOfType([transProp, PropTypes.string]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

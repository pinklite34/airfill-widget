import * as PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'react-emotion';

import { transProp } from '../../lib/prop-types';
import Text from './Text';

const Container = styled('div')`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin: ${(p: any) => (p.tight ? 0 : '0 0 8px 8px')};
  color: ${(p: any) => p.theme.tx.secondary};
`;

export default function SectionTitle({
  text,
  className,
  children,
  ...props
}: any) {
  return (
    <Container className={className} {...props}>
      {text && text.id ? <Text {...text} /> : text}
      {children}
    </Container>
  );
}
/*
SectionTitle.propTypes = {
  text: PropTypes.oneOfType([transProp, PropTypes.string]).isRequired,
  title: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
 */

import * as React from 'react';
import styled from 'react-emotion';

import { TransProp } from '../../types';
import Text from './Text';

const Container = styled('div')`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin: ${(p: any) => (p.tight ? 0 : '0 0 8px 8px')};
  color: ${(p: any) => p.theme.tx.secondary};
`;

interface SectionTitleProps {
  text: TransProp;
  className?: string;
  [x: string]: any;
}

export default function SectionTitle({
  text,
  className,
  children,
  ...props
}: SectionTitleProps) {
  return (
    <Container className={className} {...props}>
      {text && text.id ? <Text {...text} /> : text}
      {children}
    </Container>
  );
}

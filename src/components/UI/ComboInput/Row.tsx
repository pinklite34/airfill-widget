import React from 'react';
import styled from 'react-emotion';

import { rowProps } from '../../../lib/prop-types';

const Container = styled('div')`
  border-top: ${p => p.theme.bd.primary};
  display: flex;
  align-items: stretch;
  cursor: pointer;
  background: ${p => p.isActive && 'rgba(0, 0, 0, 0.08)'};
`;

const Icon = styled('div')`
  background: rgba(0, 0, 0, 0.04);
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled('div')`
  margin-left: 6px;
  font-size: 16px;
  padding: 12px;
`;

export default function Row({ operatorProps, isActive, icon, content }) {
  return (
    <Container {...operatorProps} isActive={isActive}>
      <Icon>{icon}</Icon>
      <Content>{content}</Content>
    </Container>
  );
}

Row.propTypes = rowProps;

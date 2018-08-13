import * as React from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
  border-top: ${(p: any) => p.theme.bd.primary};
  display: flex;
  align-items: stretch;
  cursor: pointer;
  background: ${(p: any) => p.isActive && 'rgba(0, 0, 0, 0.08)'};
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

export default function Row({ operatorProps, isActive, icon, content }: any) {
  return (
    <Container {...operatorProps} isActive={isActive}>
      <Icon>{icon}</Icon>
      <Content>{content}</Content>
    </Container>
  );
}

/* Row.propTypes = rowProps;
 */

import * as React from 'react';
import styled from 'react-emotion';

import Button from './Button';

const Container = styled('div')`
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${(p: any) =>  p.theme.bp.mobile}) {
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${(p: any) =>  p.theme.bp.mobile}) {
    width: 100%;
  }
`;

export default function NextButton(props) {
  return (
    <Container>
      <StyledButton
        {...props}
        text={{ id: 'button.continue', children: 'Continue' }}
      />
    </Container>
  );
}

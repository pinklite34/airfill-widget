import React from 'react';
import styled from 'react-emotion';

import Button from './Button';

const Container = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

export default function NextButton(props) {
  return (
    <Container>
      <Button
        {...props}
        text={{ id: 'button.continue', children: 'Continue' }}
      />
    </Container>
  );
}

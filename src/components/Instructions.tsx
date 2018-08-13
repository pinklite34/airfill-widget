import * as React from 'react';
import styled from 'react-emotion';

import Instruction from './Instruction';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  border-top: ${(p: any) => p.theme.bd.primary};
`;

export default function Instructions() {
  return (
    <Container>
      <Instruction
        number={1}
        title={{
          id: 'instructions.title1',
          children: 'Find a service',
        }}
        description={{
          id: 'instructions.description1',
          children:
            'Select a country or enter a phone number to see available services',
        }}
      />
      <Instruction
        number={2}
        title={{
          id: 'instructions.title2',
          children: 'Pick package & pay',
        }}
        description={{
          id: 'instructions.description2',
          children:
            'Select your desired refill amount and pay with a single click',
        }}
      />
      <Instruction
        number={3}
        title={{
          id: 'instructions.title3',
          children: 'Instant refill delivery',
        }}
        description={{
          id: 'instructions.description3',
          children: 'We send your refill the second we receive your payment',
        }}
      />
    </Container>
  );
}

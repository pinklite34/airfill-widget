import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router';
import Introduction from './Introduction';

import Logo from './logo.svg';

const Container = styled.header`
  background: #3e8fe4;
  padding: 24px;
  text-align: center;
  color: #fff;
`;

const Header = ({ branded }) => (
  <Container>
    <Logo fill="#fff" width="104" />
    <Route
      path="/"
      render={() => <Introduction branded={branded} />}
    />
  </Container>
);

export default Header;

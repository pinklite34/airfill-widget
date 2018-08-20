import * as React from 'react';
import styled from 'react-emotion';

import { Operator } from 'lib/prop-types';
import Button from '../UI/Button';
import Flex from '../UI/Flex';
import Info from '../UI/info.svg';
import Text from '../UI/Text';

const Container = styled('div')`
  background-color: ${(p: any) => p.theme.white};
  margin: -16px;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  position: relative;
`;

const Logo = styled('img')`
  max-width: 150px;
  max-height: 71px;
  flex: 0 0 auto;
  margin-right: 20px;

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    margin-bottom: 20px;
  }
`;

const Content = styled('div')`
  flex: 0 1 auto;
  width: 100%;

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Icon = styled(Info)`
  width: 24px;
  height: 24px;
  fill: #555555;
  flex: 0 0 auto;
  margin-right: 8px;
`;

const StyledButton = styled(Button)`
  width: 230px;
  margin-right: 8px;
  margin-top: 8px;
`;

interface ProviderSuggestedProps {
  operator: Operator;
  onAccept: () => void;
  onReject: () => void;
}

export default function ProviderSuggested({
  operator,
  onAccept,
  onReject,
}: ProviderSuggestedProps) {
  const name = operator && operator.name;
  return operator ? (
    <Container>
      {operator.logoImage && (
        <Logo src={operator.logoImage} alt={operator.name} />
      )}
      <Content>
        <Text id="provider.suggested.found">
          We&apos;ve detected <strong>{{ name }}</strong> as your service. If
          this is not correct, please select another service below.
        </Text>
        <Flex row justifyContent="center" margin="10px 0 0">
          <StyledButton
            onClick={onAccept}
            text={{
              id: 'button.suggested.yes',
              children: 'Yes, this is my service',
            }}
          />
          <StyledButton
            onClick={onReject}
            text={{
              id: 'button.suggested.no',
              children: "No, it's not correct",
            }}
          />
        </Flex>
      </Content>
    </Container>
  ) : (
    <Container>
      <Icon />
      <Content>
        <Text id="provider.suggested.notfound">
          We could not automatically identify your service. Please select the
          service below.
        </Text>
      </Content>
    </Container>
  );
}

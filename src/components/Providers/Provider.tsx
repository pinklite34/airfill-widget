import * as React from 'react';
import styled from 'react-emotion';

import { Operator } from '../../types';
import theme from '../../theme';
import Card from '../UI/Card';
import Text from '../UI/Text';
import More from './more.svg';
import Select from './select.svg';

const Container = styled(Card)`
  width: auto;
  flex: 0 1 128px;
  padding: 12px;
  margin: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 12px;
  line-height: 1.4;
  cursor: pointer;

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    flex: 1 0 100%;
    margin: 0 -16px;
    flex-direction: row !important;
    padding: 16px;
    box-shadow: none !important;
    border-top: ${(p: any) => p.theme.bd.primary};

    &:last-of-type {
      border-bottom: ${(p: any) => p.theme.bd.primary};
      margin-bottom: 6px;
    }

    &:first-of-type {
      margin-top: 6px;
    }
  }
`;

const LogoWrapper = styled('div')`
  height: 42px;
  width: 88px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    width: 24px;
    height: 18px;
    flex: 0 0 auto;
    margin-right: 12px;
  }
`;

const Logo = styled('img')`
  max-height: 42px;
  max-width: 88px;
  display: block;

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    max-width: 24px;
    max-height: 18px;
  }
`;

const Name = styled('div')`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  font-weight: 500;

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    text-align: left;
  }
`;

const SelectIcon = styled(Select)`
  display: none;
  fill: ${(p: any) => p.theme.bg.dark};

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    display: block;
  }
`;

interface ShowAllProps {
  onClick: () => void;
  count: any;
}

export function ShowAll({ onClick, count }: ShowAllProps) {
  return (
    <Container onClick={onClick}>
      <LogoWrapper>
        <More fill="#777777" width="42px" height="42px" />
      </LogoWrapper>
      <Name>
        <Text
          type="p"
          color={theme.tx.primary}
          id="provider.showall"
          centered
          tight
        >
          Show all <strong>{{ count }}</strong> services
        </Text>
      </Name>
    </Container>
  );
}

interface ProviderProps {
  provider: Operator;
  onSelect: () => void;
}

export default function Provider({ provider, onSelect }: ProviderProps) {
  return (
    <Container onClick={onSelect}>
      {provider.logoImage && (
        <LogoWrapper>
          <Logo src={provider.logoImage} alt={provider.name} />
        </LogoWrapper>
      )}
      <Name data-package-slug={provider.slug}>
        <Text type="p" color={theme.tx.primary} centered tight>
          {provider.name}
        </Text>
      </Name>
      <SelectIcon />
    </Container>
  );
}

import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'react-emotion';

import { transProp } from '../lib/prop-types';
import DeviceInfo from '../lib/DeviceInfo';

import Text from './UI/Text';
import theme from '../theme';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  line-height: 1.4;
  font-size: 14px;

  & + & {
    margin-top: 20px;
  }

  @media (min-width: ${(p: any) =>  p.theme.bp.tablet}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 0 0 180px;

    & + & {
      margin-top: 0;
    }
  }
`;

const Badge = styled('div')`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #009fe6;
  color: #009fe6;
  font-size: 20px;
  font-weight: 700;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  @media (min-width: ${(p: any) =>  p.theme.bp.tablet}) {
    margin-right: 0;
  }
`;

const Content = styled('div')`
  flex: 1 1 auto;
  width: 100%;
`;

const Title = styled(Text)`
  margin: 0;
  @media (min-width: ${(p: any) =>  p.theme.bp.tablet}) {
    margin: 8px 0;
  }
`;

export default function Instruction({ number, title, description }) {
  return (
    <DeviceInfo>
      {({ greaterThan }) => (
        <Container>
          <Badge>{number}</Badge>
          <Content>
            <Title
              type="h3"
              centered={greaterThan.tablet}
              color={theme.tx.accent}
              {...title}
            />
            <Text
              type="p"
              size="14px"
              centered={greaterThan.tablet}
              {...description}
            />
          </Content>
        </Container>
      )}
    </DeviceInfo>
  );
}

/* Instruction.propTypes = {
  number: PropTypes.number,
  title: transProp,
  description: transProp,
};
 */
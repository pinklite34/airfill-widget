import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'react-emotion';

import Card from '../UI/Card';

import { operatorProp } from '../../lib/prop-types';

import Info from '../UI/info.svg';

const Container = styled(Card)`
  margin: 0 16px 16px;
  font-weight: 500;
`;

const Content = styled('div')`
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;

  & svg {
    margin-right: 8px;
    width: 32px;
    height: 32px;
  }

  & * {
    max-width: 100%;
  }

  a {
    color: ${(p: any) =>  p.theme.tx.link};
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

export default class ExtraInfo extends React.PureComponent<any> {
  static propTypes = {
    info: PropTypes.string,
    operator: operatorProp,
  };

  render() {
    const { info, operator } = this.props;
    return info ? (
      <Container alwaysBorder>
        <Content>
          {operator.result &&
            operator.result.slug !== 'flightgiftcard-usd-vouchers-usa' && (
              <Info fill="#555555" />
            )}
          <div
            dangerouslySetInnerHTML={{
              __html: info,
            }}
          />
        </Content>
      </Container>
    ) : null;
  }
}

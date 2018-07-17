import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Card from '../UI/Card';

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

  a {
    color: ${p => p.theme.tx.link};
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

export default class ExtraInfo extends PureComponent {
  static propTypes = {
    info: PropTypes.string,
  };

  render() {
    const { info } = this.props;
    return (
      info && (
        <Container alwaysBorder>
          <Content>
            <Info fill="#555555" />
            <div
              dangerouslySetInnerHTML={{
                __html: info,
              }}
            />
          </Content>
        </Container>
      )
    );
  }
}

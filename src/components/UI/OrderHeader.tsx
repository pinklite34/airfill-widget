import * as React from 'react';
import styled from 'react-emotion';

import DeviceInfoProvider from '../../lib/DeviceInfoProvider';
import { Order, TransProp } from '../../types';
import Text from './Text';

const Container = styled('div')`
  background-color: #fafafa;
  display: flex;
  overflow: hidden;
  padding: 16px;
`;

const Icon = styled('div')`
  width: 32px;
  height: 32px;
  margin-right: 16px;
  margin-top: 8px;
  margin-left: 10px;

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    margin-left: 0px;
  }
`;

const TextContainer = styled('div')`
  margin: 0px;
  flex: 1;
  flex-direction: column;
`;

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

interface OrderHeaderProps {
  title: TransProp;
  subtitle: TransProp;
  icon?: JSX.Element;
  order: Order;
}

export default class OrderHeader extends React.PureComponent<OrderHeaderProps> {
  state = {
    open: false,
  };

  render() {
    const { order, title, subtitle, icon } = this.props;

    return (
      <DeviceInfoProvider>
        {({ greaterThan }) => (
          <Container>
            {greaterThan.mobile && <Icon>{icon}</Icon>}
            <TextContainer>
              <Header>
                <Text type="h1" tight {...title} />
                <Text type="p" tight>
                  <Text id="order.id">Order ID</Text> {order.id}
                </Text>
              </Header>
              {subtitle && <Text type="h3" tight {...subtitle} />}
            </TextContainer>
          </Container>
        )}
      </DeviceInfoProvider>
    );
  }
}

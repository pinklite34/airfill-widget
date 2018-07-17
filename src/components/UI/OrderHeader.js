import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Tooltip from 'material-ui/Tooltip';

import setClipboardText from '../../lib/clipboard-helper';
import { orderProp, transProp } from '../../lib/prop-types';
import DeviceInfo from '../../lib/DeviceInfo';

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

  @media (max-width: ${p => p.theme.bp.mobile}) {
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

export default class OrderHeader extends PureComponent {
  state = {
    open: false,
  };

  copy = () => {
    this.setState(
      () => ({ open: true }),
      () => setTimeout(() => this.setState(() => ({ open: false })), 2000)
    );

    setClipboardText(this.props.order.id);
  };

  render() {
    const { order, title, subtitle, icon } = this.props;

    return (
      <DeviceInfo>
        {({ greaterThan }) => (
          <Container>
            {greaterThan.mobile && <Icon>{icon}</Icon>}
            <TextContainer>
              <Header>
                <Text type="h1" tight {...title} />
                <Tooltip open={this.state.open} title="Copied!">
                  <Text type="p" tight>
                    <Text id="order.id">Order ID</Text> {order.id}
                  </Text>
                </Tooltip>
              </Header>
              <Text type="h3" tight {...subtitle} />
            </TextContainer>
          </Container>
        )}
      </DeviceInfo>
    );
  }
}

OrderHeader.propTypes = {
  title: transProp,
  subtitle: transProp,
  icon: PropTypes.node,
  order: orderProp,
};

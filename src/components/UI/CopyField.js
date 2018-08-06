import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import copyText from '../../lib/clipboard-helper';
import Text from './Text';

const Container = styled('div')`
  position: relative;
  font-size: ${p => p.size || '16px'};
  margin-top: 48px;
`;

const Address = styled('div')`
  border: 1px solid rgba(0, 0, 0, 0.16);
  background-color: #fafafa;
  font-weight: normal;
  border-radius: 2px;

  padding: ${p => p.padding || '8px'};
  width: ${p => p.width};
  line-height: 1;
  cursor: pointer;
`;

const LabelContainer = styled('div')`
  opacity: ${p => (p.show ? 0 : 1)};
  transition: opacity 0.6s ease ${p => !p.show && '0.3s'};
  position: absolute;
  top: -32px;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;

  white-space: nowrap;
`;

export default class CopyField extends React.Component {
  state = {
    timeout: null,
    animating: false,
  };

  componentWillUnmount() {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
  }

  onClick = () => {
    const { copy } = this.props;

    if (this.state.animating) {
      return;
    }

    try {
      copyText(copy);
      this.setState({
        animating: true,
        timeout: setTimeout(() => this.setState({ animating: false }), 2000),
      });
    } catch (e) {}
  };

  render() {
    const { children, label, padding, width, ...props } = this.props;
    const { animating } = this.state;

    return (
      <Container {...props}>
        <LabelContainer show={animating}>{label}</LabelContainer>
        <LabelContainer show={!animating}>
          <Text type="p" centered>
            Copied!
          </Text>
        </LabelContainer>
        <Address
          padding={padding}
          width={width}
          onMouseDown={() => (this.clicking = true)}
          onMouseMove={() => (this.clicking = false)}
          onMouseUp={() => {
            if (this.clicking) this.onClick();
          }}>
          {children}
        </Address>
      </Container>
    );
  }
}

CopyField.propTypes = {
  label: PropTypes.any,
  padding: PropTypes.string,
  width: PropTypes.string,
  address: PropTypes.string,
  children: PropTypes.any,
  copy: PropTypes.string,
};

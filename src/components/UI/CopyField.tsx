import * as PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'react-emotion';
import Text from './Text';

const Container = styled('div')`
  position: relative;
  font-size: ${(p: any) => p.size || '16px'};
  margin-top: 48px;
`;

const Address = styled('input')`
  border: 1px solid rgba(0, 0, 0, 0.16);
  background-color: #fafafa;
  font-weight: normal;
  border-radius: 2px;

  padding: ${(p: any) => p.padding || '8px'};
  width: ${(p: any) => p.width};
  line-height: 1;
  cursor: pointer;

  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${(p: any) => p.fontSize};

  :focus {
    outline: none;
  }
`;

const LabelContainer = styled('div')`
  opacity: ${(p: any) => (p.show ? 0 : 1)};
  transition: opacity 0.6s ease ${(p: any) => !p.show && '0.3s'};
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

export default class CopyField extends React.Component<any> {
  state = {
    timeout: null,
    animating: false,
  };

  componentWillUnmount() {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
  }

  onClick = e => {
    const { copyLength } = this.props;

    if (this.state.animating) {
      return;
    }

    e.target.focus();
    e.target.setSelectionRange(0, copyLength || e.target.value.length);
    document.execCommand('copy');

    this.setState({
      animating: true,
      timeout: setTimeout(() => this.setState({ animating: false }), 2000),
    });
  };

  render() {
    const { children, label, padding, width, fontSize, ...props } = this.props;
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
          onClick={this.onClick}
          readOnly
          fontSize={fontSize}
          value={children}
        />
      </Container>
    );
  }
}

/* CopyField.propTypes = {
  label: PropTypes.any,
  padding: PropTypes.string,
  width: PropTypes.string,
  address: PropTypes.string,
  children: PropTypes.any,
  fontSize: PropTypes.string,
  copyLength: PropTypes.number,
};
 */

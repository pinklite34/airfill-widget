import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import copyText from '../../lib/clipboard-helper';

const Address = styled('div')`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.16);
  background-color: #fafafa;
  font-weight: normal;
  border-radius: 2px;
  padding: ${p => p.padding || '8px'};
  font-size: ${p => p.size || '16px'};
  width: ${p => p.width};
  line-height: 1;
`;

const CopyTooltip = styled('p')`
  position: absolute;
  bottom: -34px;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${p => p.padding || '8px'};

  transition: opacity 0.4s ease;
  opacity: ${p => (p.show ? 1 : 0)};

  font-size: 12px;
  color: ${p => p.theme.tx.secondary};
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

    try {
      copyText(copy);
      this.setState({
        animating: true,
        timeout: setTimeout(() => this.setState({ animating: false }), 2000),
      });
    } catch (e) {}
  };

  render() {
    const { children, ...props } = this.props;
    const { animating } = this.state;

    return (
      <Address {...props} onClick={this.onClick}>
        {children}
        <CopyTooltip show={animating}>Copied!</CopyTooltip>
      </Address>
    );
  }
}

CopyField.propTypes = {
  address: PropTypes.string,
  children: PropTypes.any,
  copy: PropTypes.string,
};

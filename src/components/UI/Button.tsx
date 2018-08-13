import * as React from 'react';
import styled from 'react-emotion';

import { colorDarken, colorToString } from '../../lib/color';
import Spinner from './Spinner';
import Text from './Text';

function getColor({ disabled, background, theme, loading, white }) {
  if (disabled) {
    return theme.bg.disabled;
  }
  const base = background || (white ? theme.white : theme.bg.primary);
  return colorToString(loading ? colorDarken(base, 0.2) : base);
}

const StyledButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(p: any) => p.width};
  min-height: 36px;
  min-width: 100px;
  margin: ${(p: any) => p.margin || 0};
  padding: ${(p: any) => p.padding || '8px 16px'};

  border: none;
  border-radius: 2px;

  color: ${(p: any) => (p.white ? p.theme.tx.primary : p.theme.white)};
  background-color: ${getColor};
  opacity: ${(p: any) => (p.disabled ? 0.4 : 1)};

  font-weight: 500;
  font-size: ${(p: any) => (p.small ? '12px' : '14px')};

  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  cursor: ${(p: any) => (p.disabled ? 'not-allowed' : 'pointer')};

  :hover {
    background-color: ${(p: any) => colorDarken(getColor(p), 0.1)};
  }
  :active {
    background-color: ${(p: any) => colorDarken(getColor(p), 0.2)};
  }
`;

const StyledA = StyledButton.withComponent('a');

function Button({ text, loading, children, white, ...props }: any) {
  const Component = props.href ? StyledA : StyledButton;

  return (
    <Component loading={loading} white={white} {...props}>
      {loading ? (
        <Spinner white={!white} tight small />
      ) : (
        <React.Fragment>
          {children}
          {text && <Text {...text} />}
        </React.Fragment>
      )}
    </Component>
  );
}

/* Button.propTypes = {
  children: PropTypes.node,
  text: transProp,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  color: PropTypes.string,
  small: PropTypes.bool,
  white: PropTypes.bool,
  background: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
}; */

export default Button;

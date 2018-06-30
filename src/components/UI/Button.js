import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { colorDarken } from '../../lib/color';
import { transProp } from '../../lib/prop-types';

import Text from './Text';
import Spinner from './Spinner';

function getColor({ theme, secondary, loading, disabled, backgroundcolor }) {
  return theme.bg.primary;
  // const base =
  //   backgroundcolor || (secondary ? theme.bg.secondary : theme.bg.primary);
  // return colorToString(
  //   disabled ? theme.bg.disabled : loading ? colorDarken(base, 0.2) : base
  // );
}

const StyledButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  border: none;
  border-radius: 2px;
  margin: 0;
  padding: 8px 16px;
  min-width: 100px;
  color: ${p => p.theme.tx.primary};
  text-decoration: none;
  text-align: center;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  line-height: 24px;
  opacity: ${p => (p.disabled ? 0.4 : 1)};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${getColor};
  color: ${p => p.theme.white};

  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;

  :hover {
    background-color: ${p => colorDarken(getColor(p), 0.1)};
  }
  :active {
    background-color: ${p => colorDarken(getColor(p), 0.2)};
  }
`;

const StyledA = StyledButton.withComponent('a');

function Button({ text, loading, children, ...props }) {
  const Component = props.href ? StyledA : StyledButton;

  return (
    <Component loading={loading} {...props}>
      {loading ? (
        <Spinner white tight small />
      ) : (
        <Fragment>
          {children}
          {text && <Text {...text} />}
        </Fragment>
      )}
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  text: transProp,
  loading: PropTypes.bool,
  secondary: PropTypes.bool,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  backgroundcolor: PropTypes.string,
};

export default Button;

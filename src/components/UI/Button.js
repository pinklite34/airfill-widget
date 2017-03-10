import React, {PropTypes} from 'react';
import styled, {css} from 'styled-components';
import Spinner from './Spinner';

const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`
const buttonColors = (h, s, l, ) => css`
  background-color: ${({ loading }) => hsl(h, s, l - (loading ? 4 : 0))};
  &:hover {
    background-color: ${hsl(h, s, l - 4)};
  }
  &:active {
    background-color: ${hsl(h, s, l - 8)};
  }
`

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.04));
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.16),
              inset 0 1px 0 0 rgba(255,255,255,0.16);

  min-height: 40px;
  border: none;
  border-radius: 2px;
  margin: 8px 0;
  padding: ${(props) => props.loading ? 0 : '8px 16px'};
  min-width: 100px;

  color: #fff;
  text-decoration: none;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.16);
  line-height: 1.25;
  font-family: inherit;
  font-size: inherit;

  ${(props) => props.secondary ?
    buttonColors(130, 5, 65) :
    buttonColors(68, 89, 36)
  }

  &[disabled] {
    background-color: #aaa !important;
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const Button = ({children, loading, ...props}) => {
  return (
    <StyledButton type="button" {...props}>
      {loading ? <Spinner hideText inverted inline /> : children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  secondary: PropTypes.bool
};

export default Button;

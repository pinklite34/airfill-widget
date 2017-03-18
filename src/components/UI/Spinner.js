import React from 'react';
import styled, {css, keyframes} from 'styled-components';

const range = n => Array.from(Array(n).keys())

const animation = keyframes`
  from { background-color: #777; }
  to { background-color: transparent; }
`
const animationInverted = keyframes`
  from { background-color: #fff; }
  to { background-color: transparent; }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: center;
  height: 80px;
  padding: 8px;
  flex: 1;
  margin: ${props => props.inline ? '-30px' : 0};
`
const Spinner = styled.div`
  font-size: 24px;
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 1.25;
`
const Blade = styled.div`
  position: absolute;
  left: .4629em;
  bottom: 0;
  width: .074em;
  height: .2777em;
  border-radius: .0555em;
  background-color: transparent;
  transform-origin: center -.2222em;
  animation: ${props => props.inverted ? animationInverted : animation} 1s infinite linear;

  ${range(12).map(i => css`
    &:nth-child(${i}) {
      animation-delay: ${0.083 * i}s;
      transform: rotate(${30 * i}deg);
    }
  `)}
`
const Text = styled.div`
  text-align: center;
  margin: 8px 8px 0;
  font-size: 14px;
  color: #777;
`

export default ({
  children,
  hideText = false,
  inverted = false,
  inline = false,
  ...rest
}) => (
  <Wrapper inline={inline} {...rest}>
    <Spinner>
      {range(12).map(i => <Blade key={i} inverted={inverted} />)}
    </Spinner>
    {!hideText &&
      <Text>{children || 'Loading...'}</Text>
    }
  </Wrapper>
);

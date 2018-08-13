import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const duration = '0.7s';

const Container = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: ${p => (p.tight ? 0 : '100px')};
  align-items: center;
  justify-content: center;

  animation: ${p => p.fadeIn && `fadein ${p.fadeIn}s`};

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    75% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Outer = styled('div')`
  @keyframes anim-spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  display: inline-block;
  animation-name: anim-spinner;
  animation-duration: ${duration};
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  * {
    box-sizing: border-box;
  }
`;

const Circle1 = styled('div')`
  width: ${p => p.size}em;
  height: ${p => p.size / 2}em;
  overflow: hidden;
`;

const Circle2 = styled('div')`
  width: ${p => p.size}em;
  height: ${p => p.size / 2}em;
  overflow: hidden;
  transform: rotate(180deg);
`;

const Inner = styled('div')`
  @keyframes anim-circle-1 {
    from {
      transform: rotate(60deg);
    }
    to {
      transform: rotate(205deg);
    }
  }

  @keyframes anim-circle-2 {
    from {
      transform: rotate(30deg);
    }
    to {
      transform: rotate(-115deg);
    }
  }

  transform: rotate(45deg);
  border-radius: 50%;
  border: ${p => p.size / 8}em solid
    ${p => (p.white ? p.theme.white : p.theme.brand)};
  border-right: ${p => p.size / 8}em solid transparent;
  border-bottom: ${p => p.size / 8}em solid transparent;
  width: 100%;
  height: 200%;
  animation-name: ${p => (p.second ? 'anim-circle-2' : 'anim-circle-1')};
  animation-duration: ${duration};
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.5, 1);
`;

export default function Spinner({ small, ...props }) {
  const size = small ? 1 : 2;
  return (
    <Container size={size} {...props}>
      <Outer size={size} {...props}>
        <Circle1 size={size} {...props}>
          <Inner size={size} {...props} />
        </Circle1>
        <Circle2 size={size} {...props}>
          <Inner second size={size} {...props} />
        </Circle2>
      </Outer>
    </Container>
  );
}

Spinner.propTypes = {
  tight: PropTypes.bool,
  white: PropTypes.bool,
  small: PropTypes.bool,
  fadeIn: PropTypes.number,
};

Spinner.defaultProps = {
  fadeIn: 1,
};

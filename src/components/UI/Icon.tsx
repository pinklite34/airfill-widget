import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${p => p.margin || '0 16px 0 0'};
  padding: ${p => p.padding};
  min-width: ${p => p.width || '40px'};
  min-height: ${p => p.height || '30px'};
`;

const Img = styled('img')`
  max-width: ${p => p.width || '40px'};
  max-height: ${p => p.height || '30px'};
`;

export default function Icon({ src, alt, width, height, ...props }) {
  return (
    <Container {...props}>
      {typeof src === 'string' ? (
        <Img src={src} alt={alt} width={width} height={height} />
      ) : (
        src
      )}
    </Container>
  );
}

Icon.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
};

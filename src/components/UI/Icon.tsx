import * as React from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(p: any) => p.margin || '0 16px 0 0'};
  padding: ${(p: any) => p.padding};
  min-width: ${(p: any) => p.width || '40px'};
  min-height: ${(p: any) => p.height || '30px'};
`;

const Img = styled('img')`
  max-width: ${(p: any) => p.width || '40px'};
  max-height: ${(p: any) => p.height || '30px'};
`;

interface IconProps {
  src: string | object;
  alt?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
}

export default function Icon({ src, alt, width, height, ...props }: IconProps) {
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

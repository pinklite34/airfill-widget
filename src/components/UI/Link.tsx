import * as React from 'react';
import styled from 'react-emotion';

import { startsWith } from '../../lib/string';

const StyledLink = styled('p')`
  color: ${(p: any) => p.theme.tx.link};
  text-decoration: none;
  cursor: pointer;

  width: ${(p: any) => p.width};

  &:hover,
  &:focus,
  &:active {
    text-decoration: underline;
  }

  svg {
    vertical-align: middle;
    margin: 0 12px 0 6px;
    fill: ${(p: any) => p.theme.tx.link};
  }
`;

const ExternalLink = StyledLink.withComponent('a');

interface LinkProps {
  href: string;
  children: any;
  [x: string]: any;
}

export default function Link({ href, children, ...props }: LinkProps) {
  const isExternal =
    Boolean(href) && !startsWith(href, '#') && !startsWith(href, 'mailto');
  const Component = href ? ExternalLink : StyledLink;

  return (
    <Component
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener' } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}

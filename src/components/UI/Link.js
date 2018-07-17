import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { startsWith } from '../../lib/string';

const StyledLink = styled('p')`
  color: ${p => p.theme.tx.link};
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    text-decoration: underline;
  }

  svg {
    vertical-align: middle;
    margin: 0 12px 0 6px;
    fill: ${p => p.theme.tx.link};
  }
`;

const ExternalLink = StyledLink.withComponent('a');

export default function Link({ href, children, ...props }) {
  const isExternal = Boolean(href) && !startsWith(href, '#');
  const Component = href ? ExternalLink : StyledLink;

  return (
    <Component
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener' } : {})}
      {...props}>
      {children}
    </Component>
  );
}

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

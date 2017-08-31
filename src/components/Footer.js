import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  padding: 16px;
  display: flex;
  justify-content: ${props => (props.branded ? 'space-between' : 'center')};
  font-size: 12px;
  color: #999999;

  strong {
    color: #777777;
  }

  a {
    color: #999999;
  }
`;

const LinkList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    dislay: block;
    margin-left: 12px;
  }
`;

const Link = ({ children, ...props }) =>
  <li>
    <a {...props}>
      {children}
    </a>
  </li>;

const Footer = ({ branded }) =>
  <Container branded={branded}>
    {branded &&
      <div>
        Powered by <strong>bitrefill</strong>
      </div>}
    <div>
      <LinkList>
        <Link
          href="https://www.bitrefill.com/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </Link>
        <Link
          href="https://www.bitrefill.com/terms/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </Link>
      </LinkList>
    </div>
  </Container>;

export default Footer;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'react-emotion';

import Text from './UI/Text';

const Container = styled('div')`
  padding: 16px;
  display: flex;
  justify-content: ${(p: any) =>  (p.branded ? 'space-between' : 'center')};
  font-size: 12px;
  color: #999;

  & strong {
    color: #777;
  }

  & a {
    color: #999;
  }
`;

const List = styled('ul')`
  display: flex;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

const ListItem = styled('li')`
  margin: 0 5px;
`;

const Link = styled('a')`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

interface FooterProps {
  branded?: boolean;
}

export default function Footer({ branded }: FooterProps) {
  return (
    <Container branded={branded}>
      {branded && (
        <Link
          href="https://www.bitrefill.com/"
          target="_blank"
          rel="noopener noreferrer">
          <Text type="p" id="footer.powered" tight>
            Powered by <strong>bitrefill</strong>
          </Text>
        </Link>
      )}
      <div>
        <List>
          <ListItem>
            <Link
              href="https://www.bitrefill.com/privacy/"
              target="_blank"
              rel="noopener noreferrer">
              <Text type="p" tight id="footer.privacy">
                Privacy Policy
              </Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.bitrefill.com/terms/"
              target="_blank"
              rel="noopener noreferrer">
              <Text type="p" tight id="footer.terms">
                Terms of Service
              </Text>
            </Link>
          </ListItem>
        </List>
      </div>
    </Container>
  );
}
/*
Footer.propTypes = {
  branded: PropTypes.bool,
};
 */
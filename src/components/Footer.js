import React from 'react';
import { css } from 'glamor';

const styles = {
  container: css({
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 12,
    color: '#999',
    '& strong': {
      color: '#777',
    },
    '& a': {
      color: '#999',
    },
  }),
  branded: css({
    justifyContent: 'space-between',
  }),
  linkList: css({
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  }),
  link: css({
    display: 'block',
    marginLeft: 12,
  }),
};

const Footer = ({ branded }) => (
  <div {...css(styles.container, branded && styles.branded)}>
    {branded && (
      <div>
        Powered by <strong>bitrefill</strong>
      </div>
    )}
    <div>
      <ul {...styles.linkList}>
        <li {...styles.link}>
          <a
            href="https://www.bitrefill.com/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </li>
        <li {...styles.link}>
          <a
            href="https://www.bitrefill.com/terms/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Footer;

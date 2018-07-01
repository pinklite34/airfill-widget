import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const styles = {
  container: css`
    padding: 16px;
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #999;

    & strong {
      color: #777;
    }

    & a {
      color: #999;
    }
  `,
  branded: css`
    justify-content: space-between;
  `,
  linkList: css`
    display: flex;
    list-style-type: none;
    margin: 0px;
    padding: 0px;
  `,
  link: css`
    display: block;
    margin-left: 12px;
  `,
};

export default function Footer({ branded }) {
  return (
    <div className={`${styles.container} ${branded && styles.branded}`}>
      {branded && (
        <div>
          Powered by <strong>bitrefill</strong>
        </div>
      )}
      <div>
        <ul className={styles.linkList}>
          <li className={styles.link}>
            <a
              href="https://www.bitrefill.com/privacy/"
              target="_blank"
              rel="noopener noreferrer">
              Privacy Policy
            </a>
          </li>
          <li className={styles.link}>
            <a
              href="https://www.bitrefill.com/terms/"
              target="_blank"
              rel="noopener noreferrer">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

Footer.propTypes = {
  branded: PropTypes.bool,
};

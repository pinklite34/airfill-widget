import React from 'react';
import { css } from 'react-emotion';

const styles = {
  input: css`
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 8px;
  `,
};

export default function Input(props) {
  return <input className={styles.input} {...props} />;
}

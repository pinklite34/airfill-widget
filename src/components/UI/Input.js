import React from 'react';
import { css } from 'glamor';

const styles = {
  input: css({
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 2,
    padding: 8,
  }),
};

export default function Input(props) {
  return <input {...styles.input} {...props} />;
}

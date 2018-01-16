import React from 'react';
import { css } from 'glamor';

const styles = {
  input: css({
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 2,
    padding: 8,
  })
};

const Input = props => <input {...styles.input} {...props} />;

export default Input;

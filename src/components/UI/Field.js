import React from 'react';
import { css } from 'glamor';

import SectionTitle from './SectionTitle';

const styles = {
  title: css({
    marginBottom: 0
  }),
  hint: css({
    fontSize: 12,
    margin: '4px 0 8px'
  }),
  error: css({
    color: '#D65C5C'
  })
};

const Field = ({ label, children, htmlFor, hint, error, ...props }) => (
  <div {...props}>
    {label && (
      <SectionTitle {...styles.title}>
        <label htmlFor={htmlFor}>{label}</label>
      </SectionTitle>
    )}
    <div>{children}</div>
    {error && <p {...styles.error}>{error}</p>}
    {!error && hint && <p {...styles.hint}>{hint}</p>}
  </div>
);

export default Field;

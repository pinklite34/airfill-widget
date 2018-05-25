import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import SectionTitle from './SectionTitle';

const styles = {
  title: css({
    marginBottom: 0,
  }),
  hint: css({
    fontSize: 12,
    margin: '-12px 0 8px',
  }),
  error: css({
    color: '#D65C5C',
  }),
};

export default function Field({
  label,
  children,
  htmlFor,
  hint,
  error,
  ...props
}) {
  return (
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
}

Field.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  htmlFor: PropTypes.string,
  hint: PropTypes.node,
  error: PropTypes.node,
};

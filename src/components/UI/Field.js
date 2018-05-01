import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

import SectionTitle from './SectionTitle';

const styles = {
  title: css`
<<<<<<< HEAD
    margin-bottom: 0px;
  `,
  hint: css`
    font-size: 12px;
    margin: -12px 0 8px;
=======
    margin-bottom: 0;
  `,
  hint: css`
    font-size: 12px;
    margin: 4px 0 8px;
>>>>>>> field and flag components use emotion
  `,
  error: css`
    color: #d65c5c;
  `,
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
        <SectionTitle className={styles.title}>
          <label htmlFor={htmlFor}>{label}</label>
        </SectionTitle>
      )}
      <div>{children}</div>
      {error && <p className={styles.error}>{error}</p>}
      {!error && hint && <p className={styles.hint}>{hint}</p>}
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

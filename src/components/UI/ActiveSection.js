import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import SectionTitle from './SectionTitle';

const styles = {
  container: css`
    background-color: #fafafa;
    padding: 16px;
  `,
};

export default function ActiveSection({ title, children, ...props }) {
  return (
    <div className={styles.container} {...props}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </div>
  );
}

ActiveSection.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

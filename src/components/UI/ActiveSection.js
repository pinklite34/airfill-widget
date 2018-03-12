import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import SectionTitle from './SectionTitle';

const styles = {
  container: css({
    backgroundColor: '#FAFAFA',
    padding: 16,
  }),
};

export default function ActiveSection({ title, children, ...props }) {
  return (
    <div {...styles.container} {...props}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </div>
  );
}

ActiveSection.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

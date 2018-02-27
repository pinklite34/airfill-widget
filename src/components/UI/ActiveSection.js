import React from 'react';
import { css } from 'glamor';
import SectionTitle from './SectionTitle';

const styles = {
  container: css({
    backgroundColor: '#FAFAFA',
    padding: 16,
  }),
};

const ActiveSection = ({ title, children, ...props }) => (
  <div {...styles.container} {...props}>
    {title && <SectionTitle>{title}</SectionTitle>}
    {children}
  </div>
);

export default ActiveSection;

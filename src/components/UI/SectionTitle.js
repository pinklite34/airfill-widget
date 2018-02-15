import React from 'react';
import { css } from 'glamor';

const style = css({
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  marginBottom: 8,
  color: '#777',
});

const SectionTitle = ({ children, ...props }) => (
  <div {...style} {...props}>
    {children}
  </div>
);

export default SectionTitle;

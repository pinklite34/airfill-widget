import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const style = css({
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  marginBottom: 8,
  marginLeft: 8,
  color: '#777',
});

export default function SectionTitle({ children, ...props }) {
  return (
    <div {...style} {...props}>
      {children}
    </div>
  );
}

SectionTitle.propTypes = {
  children: PropTypes.node,
};

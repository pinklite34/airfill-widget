import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const style = css`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  margin-left: 8px;
  color: #777;
`;

export default function SectionTitle({ children, className, ...props }) {
  return (
    <div className={`${style} ${className}`} {...props}>
      {children}
    </div>
  );
}

SectionTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

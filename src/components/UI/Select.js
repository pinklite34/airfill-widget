import React, {PropTypes} from 'react';
import './Select.scss';

const Select = ({children, ...props}) => {
  return (
    <div className="select">
      <select {...props}>{children}</select>
      <div className="select-arrow" />
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.array.isRequired
};

export default Select;

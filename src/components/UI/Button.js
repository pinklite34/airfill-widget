import React, {PropTypes} from 'react';
import Spinner from './Spinner';
import './Button.scss';

const Button = ({children, className, loading, disabled, ...props}) => {
  const finalClassNames = (className || '') + (loading ?
    ' button button-loading' : ' button');

  return (
    <button type="button" className={finalClassNames} {...props} disabled={disabled}>
      {loading ? <Spinner hideText={true} inverted={true} /> : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool
};

export default Button;

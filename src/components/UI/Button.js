import React, {PropTypes} from 'react';
import Spinner from './Spinner';
import './Button.scss';

const Button = ({children, loading, className, disabled, ...props}) => {
  const finalClassNames = (className || '') + (loading ?
    ' button button-loading' : ' button');

  return (
    <button type="button" className={finalClassNames} {...props} disabled={disabled}>
      {loading ? <Spinner hideText={true} inverted={true} /> : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  to: PropTypes.string
};

export default Button;

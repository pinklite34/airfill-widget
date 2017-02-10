import React from 'react';

const Field = ({label, htmlFor, error, hint, children, className}) => {
  return (
    <div className={'refill-field-container ' + (className || '')}>
      {label &&
        <label className="refill-field-label" htmlFor={htmlFor}>{label}</label>
      }
      <div className="refill-field">
        {children}
      </div>
      {error &&
        <p className="refill-error-message">{error}</p>
      }
      {(!error && hint) ?
        (typeof hint === 'string' ?
          <p className="refill-field-hint" dangerouslySetInnerHTML={{ __html: hint }} />
        : <p className="refill-field-hint">{hint}</p>)
      : null}
    </div>
  );
};

export default Field;

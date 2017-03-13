import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 16px;

  &:last-child,
  &:last-child > p:last-child {
    margin-bottom: 0;
  }

  .refill-field-label {
    display: block;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    color: #777;
    margin-bottom: 8px;
  }

  .refill-field-hint, .refill-error-message {
    font-size: 12px;
    margin: 8px 0;
    max-width: 32em;
    color: #777;
  }

  .refill-error-message {
    color: #D65C5C;
  }
`

const Field = ({label, htmlFor, error, hint, children, ...rest}) => {
  return (
    <Container {...rest}>
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
    </Container>
  );
};

export default Field;

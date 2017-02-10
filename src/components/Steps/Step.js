import React from 'react';

const RefillStep = ({step, title, subTitle, expanded, children, onBack, showSummary, onSubmit}) => {
  return (
    <section className={`refill-step-container ${expanded ? ' refill-step-expanded' : ''}`}>
      <h2 className="refill-step-title">
        <span className="refill-step-number">{step}</span>
        {title}
        {subTitle ? <small className="refill-step-subtitle">{subTitle}</small> : null}
      </h2>
      {(showSummary || expanded) &&
        <form className="refill-step-body" onSubmit={(e) => {
          e.preventDefault();
          onSubmit && onSubmit();
        }}>
          {children}
        </form>
      }
      {showSummary && onBack &&
        <button type="button" onClick={onBack} className="refill-step-back button-secondary">Change</button>}
    </section>
  );
};

export default RefillStep;

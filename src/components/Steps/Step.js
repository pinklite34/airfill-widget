import React from 'react';
import styled, {css} from 'styled-components';
import Button from '../UI/Button';

const Container = styled.section`
  padding: 16px;
  background-color: hsl(130,5%,95%);
  border: 1px solid rgba(0,0,0,0.16);
  border-top-width: 0;
  color: #999;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02);
  max-width: 720px;

  &:first-child {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-top-width: 1px;
  }
  &:last-child {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .refill-step-title {
    color: #666;
    font-size: 18px;
    margin: 0;
  }

  .refill-step-subtitle {
    color: #999;
    font-size: 12px;
    margin: 12px 0 0 4px;
    line-height: 1;
    float: right;
  }

  .refill-step-number {
    display: inline-block;
    width: 28px;
    height: 28px;
    line-height: 1.55;
    border-radius: 50%;
    background-color: rgba(152, 174, 10, 0.8);
    color: rgba(0,0,0,0.6);
    text-align: center;
    margin: 0 14px 0 -2px;
    color: #fff;
  }

  .refill-step-body {
    display: block;
    padding: 8px 0 8px 40px;
    font-size: 14px;
  }

  .refill-step-back {
    display: block;
    margin: -50px 0 12px auto;

    @media(max-width: 480px) {
      margin: -42px 0 6px auto;
      min-height: 36px;
      min-width: 80px;
    }
    @media(max-width: 320px) {
      padding: 0 8px;
      min-height: 28px;
      margin: -26px 0 -2px auto;
    }
  }

  @media(max-width: 480px) {
    padding: 12px;

    .refill-step-number {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }

    .refill-step-title {
      font-size: 14px;
    }
    .refill-step-subtitle {
      margin: 6px 0 0 4px;
    }
    .refill-step-body {
      padding: 8px 0 0;
    }
    .select { display: block; }
    input[type="email"] { width: 100%; }
  }

  ${({expanded}) => expanded && css`
    /* Current step */
    background-color: hsl(130,5%,99%);
    color: #555;

    .refill-step-title {
      color: #333;
      margin-bottom: 4px;
    }
    .refill-step-number {
      background-color: rgb(152, 174, 10);
    }

    /* Next steps*/
    ~ & {
      background-color: hsl(130,0%,95%);
      opacity: 0.6;

      .refill-step-number {
        background-color: rgba(152, 174, 10, 0.6);
      }
    }
  `}
`

const RefillStep = ({step, title, subTitle, expanded, children, onBack, showSummary, onSubmit}) => {
  return (
    <Container expanded={expanded}>
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
        <Button secondary onClick={onBack} className="refill-step-back">Change</Button>}
    </Container>
  );
};

export default RefillStep;

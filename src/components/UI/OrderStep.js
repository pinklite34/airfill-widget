import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Step = styled.h3`
  display: flex;
  opacity: 0.6;

  & + & {
    margin-top: 12px;
  }
  &:last-of-type {
    opacity: 1;
  }
  strong, a {
    display: block;
  }
`

const StepSymbol = styled.span`
  display: flex;
  height: 19px;
  width: 16px;
  margin-bottom: -19px;
  padding: 0;
  position: relative;
  left: -24px;
  margin-right: -16px;
  align-items: center;
  justify-content: center;

  @media(max-width: 480px) {
    left: -2px;
    margin-right: 6px;
  }
`

const DoneSymbol = styled(StepSymbol)`
  color: #98AE0A;
`
DoneSymbol.defaultProps = { children: '✓ '}

const ErrorSymbol = styled(StepSymbol)`
  color: #E1283C;
`
ErrorSymbol.defaultProps = { children: 'X '}

const SpinnerSymbol = styled(Spinner)`
  flex: 0;
  margin-right: 0px;
  margin-left: -32px;

  > * { font-size: 16px; }

  @media(max-width: 480px) {
    margin-left: -10px;
  }
`

const OrderStep = ({children, done, error}) => {
  return (
    <Step>
      {error ? <ErrorSymbol /> :
        done ? <DoneSymbol /> :
        <SpinnerSymbol hideText inline />
      }
      {children}
    </Step>
  );
};

OrderStep.propTypes = {
  children: PropTypes.node.isRequired,
  done: PropTypes.bool,
  error: PropTypes.bool
};

export default OrderStep;

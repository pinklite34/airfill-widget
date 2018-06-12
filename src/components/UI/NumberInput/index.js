import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { default as MuiButton } from 'material-ui/Button';

import Check from '../check.svg';
import Cross from '../error.svg';

const Input = styled('input')`
  width: 100%;
  font-size: 16px;
  border: 0;
  &:focus {
    outline: none;
  }
  &::placeholder: {
    color: rgba(0, 0, 0, 0.26);
  }
`;

const Container = styled('div')`
  position: relative;
  z-index: 11;

  background-color: white;
  border-radius: 2px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

const InputContainer = styled('div')`
  padding: 12px;
  flex: 1 1 auto;
`;

const IconContainer = styled('div')`
  width: 48px;
  background: #f0f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Button = styled(MuiButton)`
  background-color: #f0f6fa !important;
  color: ${props => (props.disabled ? '#cccccc' : '#3e8fe4')} !important;
  min-width: 48px !important;
  height: auto !important;
  display: flex !important;
  & svg {
    margin-right: 0;
  }
`;

const Row = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const ErrorIcon = styled(Cross)`
  width: 16px;
  height: 16px;
  fill: #f00;
`;

const Icon = styled(Check)`
  width: 16px;
  height: 16px;
  fill: #3e8fe3;
`;

function InputRow({ onChange, submitEnabled, onSubmit, value, icon }) {
  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}>
        <Row>
          <IconContainer>{icon}</IconContainer>
          <InputContainer>
            <Input onChange={e => onChange(e.target.value)} value={value} />
          </InputContainer>
          <Button disabled={!submitEnabled} type="submit">
            {submitEnabled ? <Icon /> : <ErrorIcon />}
          </Button>
        </Row>
      </form>
    </Container>
  );
}

InputRow.propTypes = {
  onChange: PropTypes.any,
  submitEnabled: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
};

export default InputRow;

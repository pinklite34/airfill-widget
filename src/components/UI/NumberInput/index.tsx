import * as React from 'react';
import styled from 'react-emotion';

import Button from '../Button';
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

const StyledButton = styled(Button)`
  background-color: #f0f6fa !important;
  color: ${(props: any) => (props.disabled ? '#cccccc' : '#3e8fe4')} !important;
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

interface InputRowProps {
  onChange: (email: string) => void;
  submitEnabled?: boolean;
  placeholder?: string;
  onSubmit: () => void;
  value: string;
  icon: any;
}

function InputRow({
  onChange,
  submitEnabled,
  onSubmit,
  placeholder,
  value,
  icon,
}: InputRowProps) {
  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Row>
          <IconContainer>{icon}</IconContainer>
          <InputContainer>
            <Input
              placeholder={placeholder}
              onChange={e => onChange(e.target.value)}
              value={value}
            />
          </InputContainer>
          <StyledButton disabled={!submitEnabled} type="submit">
            {submitEnabled ? <Icon /> : <ErrorIcon />}
          </StyledButton>
        </Row>
      </form>
    </Container>
  );
}

export default InputRow;

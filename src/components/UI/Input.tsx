import * as React from 'react';
import styled from 'react-emotion';

import { Translatable } from '../../types';

import Text from './Text';

const Field = styled('label')`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
`;

const Label = styled('span')`
  width: 100%;
  text-align: left;
  color: ${p => p.theme.tx.primary};
  margin-bottom: 4px;
`;

const StyledInput = styled('input')`
  width: 100%;
  border: 0;
  color: ${p => p.theme.tx.primary};
  border: ${p => p.theme.bd.input};
  padding: 14px 8px 10px;
  line-height: 1.15;
  transition: all 250ms;
  resize: vertical;
  border-radius: 4px;

  ::placeholder {
    color: ${p => p.theme.tx.secondary};
    opacity: 0.5;
  }

  :hover,
  :focus,
  :active {
    border-bottom: ${p => p.theme.bd.inputActive};
  }
`;

export default function Input({
  text,
  onChange,
  value,
  required,
  type = 'text',
}: {
  text: Translatable;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  required?: boolean;
  type?: 'text' | 'number';
}) {
  return (
    <Field>
      <Label>
        <Text {...text} />
      </Label>
      <StyledInput
        onChange={onChange}
        value={value}
        required={required}
        type={type}
      />
    </Field>
  );
}

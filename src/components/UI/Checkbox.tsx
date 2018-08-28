import * as React from 'react';
import styled from 'react-emotion';

import { Translatable } from '../../types';

import Flex from './Flex';
import Text from './Text';

const Field = styled('label')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`;

const Wrapper = styled(Flex)`
  width: 45px;
  height: 40px;
`;

const StyledInput = styled('input')`
  border: 0;
  min-height: 40px;
  padding: 14px 8px 10px;
  line-height: 1.15;
`;

interface CheckboxProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  text: Translatable;
}

export default function Checkbox({ onChange, checked, text }: CheckboxProps) {
  return (
    <Field>
      <Wrapper centered>
        <StyledInput onChange={onChange} checked={checked} type="checkbox" />
      </Wrapper>
      <Text type="p" margin="0" {...text} />
    </Field>
  );
}

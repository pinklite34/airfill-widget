import { PaymentButton } from 'lib/prop-types';
import * as React from 'react';
import styled from 'react-emotion';

import theme from '../../theme';
import Icon from '../UI/Icon';
import Text from '../UI/Text';

const Container = styled('div')`
  width: 100%;
  padding: 0 16px;

  background-color: ${(p: any) => (p.selected ? '#3e8fe4' : '#fff')};
  border-bottom: ${(p: any) => p.theme.bd.primary};

  &:hover {
    background-color: ${(p: any) => !p.selected && '#fafafa'};
  }

  &:last-of-type {
    border: none;
  }

  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-decoration: none;
  box-sizing: border-box;
  text-align: left;
  cursor: ${(p: any) => (p.disabled ? 'normal' : 'pointer')};

  * {
    ${(p: any) => (p.disabled ? 'color: gray !important' : '')};
    ${(p: any) => (p.disabled ? 'filter: grayscale(100%)' : '')};
  }
`;

const TextContainer = styled('div')`
  * {
    display: block;
  }
`;

interface PaymentItemProps {
  method: PaymentButton;
  onClick: () => void;
  selected: boolean;
  affordable: boolean;
}

const PaymentItem = ({
  method,
  onClick,
  affordable,
  selected,
}: PaymentItemProps) => {
  const { icon, title, description, notice } = method;

  const disabled = !affordable;
  const color = selected ? 'white' : null;

  return (
    <Container
      onClick={() => !disabled && onClick()}
      selected={selected}
      disabled={disabled}
    >
      <Icon src={icon} alt={(title && title.id) || title} />
      <TextContainer>
        {title && title.id ? (
          <Text
            type="h3"
            color={color || theme.tx.primary}
            weight={500}
            margin="8px 0"
            {...title}
          />
        ) : (
          <Text
            type="h3"
            color={color || theme.tx.primary}
            weight={500}
            margin="8px 0"
          >
            {title}
          </Text>
        )}
        {typeof description === 'function' ? (
          <Text color={color} type="p">
            {description(affordable)}
          </Text>
        ) : description && description.id ? (
          <Text color={color} type="p" {...description} />
        ) : (
          <Text color={color} type="p">
            {description}
          </Text>
        )}
        {notice && (
          <Text color={color} type="p" weight={700}>
            {notice}
          </Text>
        )}
      </TextContainer>
    </Container>
  );
};

export default PaymentItem;

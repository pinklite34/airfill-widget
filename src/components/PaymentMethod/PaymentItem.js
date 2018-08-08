import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { paymentProp } from '../../lib/prop-types';

import Icon from '../UI/Icon';
import Text from '../UI/Text';
import theme from '../../theme';

const Container = styled('div')`
  width: 100%;
  padding: 0 16px;

  background-color: ${p => (p.selected ? '#d8d8d8' : '#fff')};
  border-bottom: ${p => p.theme.bd.primary};

  &:hover {
    background-color: ${p => (p.selected ? '#d8d8d8' : '#fafafa')};
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
  cursor: ${p => (p.disabled ? 'normal' : 'pointer')};

  * {
    ${p => (p.disabled ? 'color: gray !important' : '')};
    ${p => (p.disabled ? 'filter: grayscale(100%)' : '')};
  }
`;

const TextContainer = styled('div')`
  * {
    display: block;
  }
`;

const PaymentItem = ({ method, onClick, selected, disabled }) => {
  const { icon, title, description, notice } = method;

  return (
    <Container onClick={onClick} selected={selected} disabled={disabled}>
      <Icon src={icon} alt={(title && title.id) || title} />
      <TextContainer>
        {title && title.id ? (
          <Text
            type="h3"
            color={theme.tx.primary}
            weight={500}
            margin="8px 0"
            {...title}
          />
        ) : (
          <Text type="h3" color={theme.tx.primary} weight={500} margin="8px 0">
            {title}
          </Text>
        )}
        {typeof description === 'function' ? (
          <Text type="p">{description(!disabled)}</Text>
        ) : description && description.id ? (
          <Text type="p" {...description} />
        ) : (
          <Text type="p">{description}</Text>
        )}
        {notice && (
          <Text type="p" weight={700}>
            {notice}
          </Text>
        )}
      </TextContainer>
    </Container>
  );
};

PaymentItem.propTypes = {
  method: paymentProp,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default PaymentItem;

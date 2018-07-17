import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Icon from '../UI/Icon';

const Container = styled('div')`
  width: 100%;
  height: 72px;
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

const Title = styled('span')`
  font-weight: 700;
`;

const Description = styled('span')`
  color: #777777;
  font-size: 12px;
  padding-top: 4px;
`;

const Notice = styled('span')`
  color: #777777;
  font-size: 12px;
  font-weight: 700;
  padding-top: 4px;
`;

const PaymentItem = ({
  icon,
  title,
  description,
  notice,
  onClick,
  selected,
  disabled,
}) => {
  return (
    <Container onClick={onClick} selected={selected} disabled={disabled}>
      <Icon src={icon} alt={title} />
      <TextContainer>
        <Title>{title}</Title>
        <Description>
          {typeof description === 'function'
            ? description(!disabled)
            : description}
        </Description>
        {notice && <Notice>{notice}</Notice>}
      </TextContainer>
    </Container>
  );
};

PaymentItem.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    .isRequired,
  notice: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default PaymentItem;

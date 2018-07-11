import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Container = styled('div')`
  width: 100%;
  height: 72px;

  background-color: ${props => (props.selected ? '#d8d8d8' : '#fff')};

  &:hover {
    background-color: ${props => (props.selected ? '#d8d8d8' : '#fafafa')};
  }

  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-decoration: none;
  box-sizing: border-box;
  text-align: left;
  cursor: ${props => (props.disabled ? 'normal' : 'pointer')};

  * {
    ${props => (props.disabled ? 'color: gray !important' : '')};
    ${props => (props.disabled ? 'filter: grayscale(100%)' : '')};
  }
`;

const IconContainer = styled('div')`
  width: 56px;
  display: inline-block;
  padding: 16px;
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
      <IconContainer>
        {typeof icon === 'string' ? (
          <img src={icon} style={{ maxWidth: '100%' }} />
        ) : (
          icon
        )}
      </IconContainer>
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

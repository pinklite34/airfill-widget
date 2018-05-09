import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

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
`;

const styles = {
  icon: css`
    max-width: 24px;
  `,
};

const IconContainer = styled('div')`
  width: 32px;

  display: inline-block;
  padding: 12px;
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
`;

const PaymentItem = ({ icon, title, description, onClick, selected }) => {
  if (typeof icon === 'string') {
    icon = <img src={icon} className={styles.icon} />;
  }
  return (
    <Container onClick={onClick} selected={selected}>
      <IconContainer>{icon}</IconContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextContainer>
    </Container>
  );
};

PaymentItem.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
  description: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default PaymentItem;

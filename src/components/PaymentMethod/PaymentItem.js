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
`;

const Icon = styled('div')`
  max-width: 32px;
  max-height: 32px;
  min-width: 32px;
  display: inline-block;
  padding: 6px;
`;

const TextContainer = styled('div')`
  * {
    display: block;
  }
`;

const Title = styled('span')`
  font-weight: 700;
`;

const Description = styled('span')``;

const PaymentItem = ({ icon, title, description, onClick, selected }) => (
  <Container onClick={onClick} selected={selected}>
    <Icon>{icon}</Icon>
    <TextContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </TextContainer>
  </Container>
);

PaymentItem.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
  description: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default PaymentItem;

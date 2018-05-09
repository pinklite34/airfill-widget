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
    max-width: 100%;
  `,
};

const IconContainer = styled('div')`
  width: 24px;
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
`;

const Notice = styled('span')`
  color: #777777;
  font-size: 12px;
  font-weight: 700;
`;

const PaymentItem = ({
  icon,
  title,
  description,
  notice,
  onClick,
  selected,
}) => {
  if (typeof icon === 'string') {
    icon = <img src={icon} className={styles.icon} />;
  }
  return (
    <Container onClick={onClick} selected={selected}>
      <IconContainer>{icon}</IconContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        {notice && <Notice>{notice}</Notice>}
      </TextContainer>
    </Container>
  );
};

PaymentItem.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  notice: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default PaymentItem;

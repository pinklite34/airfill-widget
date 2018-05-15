import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

const Container = styled('div')`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e4e4e4;
`;

const StyledButton = styled(Button)`
  background-color: #fff !important;
  font-size: 12px !important;
  margin: -4px !important;
`;

const Text = styled('div')`
  font-size: 16px;
  color: #777777 !important;
  font-weight: 500 !important;
  flex: 1 1 auto;
  & strong {
    padding-bottom: 2px;
    border-bottom: 1px solid #cccccc;
  }
`;

export default function Collapsed({ onClick, type, hideButton, children }) {
  return (
    <Container>
      <Text>{children}</Text>
      {hideButton ? null : (
        <StyledButton onClick={onClick}>Change {type}</StyledButton>
      )}
    </Container>
  );
}

Collapsed.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  hideButton: PropTypes.bool,
  children: PropTypes.node,
};

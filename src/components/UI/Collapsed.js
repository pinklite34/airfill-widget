import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Button from './Button';

const Container = styled('div')`
  height: 36px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
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
        <Button small white onClick={onClick}>
          Change {type}
        </Button>
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

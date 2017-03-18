import React, {PropTypes} from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 8px 0 0;

  select {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    padding: 8px 24px 8px 16px;
    line-height: 24px;
    height: 40px;
    cursor: pointer;
    color: #7b7b7b;
    border-radius: 0;
    background: #fff;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  select::-ms-expand {
    display: none;
  }
  select:hover,
  select:focus {
    color: #000;
    background: #fff;
  }

  select:disabled {
    pointer-events: none;
    opacity: .5;
  }
`
const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 12px;
  width: 0;
  height: 0;
  pointer-events: none;
  border-width: 8px 5px 0 5px;
  border-style: solid;
  border-color: #777 transparent transparent transparent;

  select:hover ~ &,
  select:focus ~ & ,
  select:active ~ & {
    border-top-color: #333;
  }

  select:disabled ~ & {
    border-top-color: #ccc;
  }
`

const Select = ({children, ...props}) => {
  return (
    <SelectContainer>
      <select {...props}>{children}</select>
      <SelectArrow />
    </SelectContainer>
  );
};

Select.propTypes = {
  children: PropTypes.array.isRequired
};

export default Select;

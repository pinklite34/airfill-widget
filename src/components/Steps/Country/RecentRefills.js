import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { parse, format } from 'libphonenumber-js';
import { useRecentRefill } from '../../../actions';
import { selectInventory } from '../../../store/inventory';

const mapStateToProps = (state, { history }) => {
  const inventory = selectInventory(state).result;

  const items = history.reduce(
    (acc, { number, operator }) => {
      const { country } = parse(number);

      if (country in inventory) {
        const formattedNumber = format(number, 'International');

        if (operator && operator in inventory[country].operators) {
          acc.push({
            operator,
            number: formattedNumber
          });
        } else {
          // Allow refill history with invalid/without operator
          acc.push({
            number: formattedNumber
          });
        }
      }

      return acc;
    },
    []
  );

  return { items };
};

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RefillButton = styled.a`
  display: block;
  padding: 4px 12px;
  background-color: rgba(0,0,0,0.04);
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.12);
  margin-right: 8px;
  margin-bottom: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0,0);
  }
`;

const RefillNumber = styled.strong``;

const RecentRefills = ({ items, useRecentRefill }) => (
  <div>
    <h3>Recent refills</h3>
    <ButtonContainer>
      {items.map(refill => (
        <RefillButton onClick={() => useRecentRefill(refill)} key={refill.number}>
          <RefillNumber>{refill.number}</RefillNumber>
        </RefillButton>
      ))}
    </ButtonContainer>
  </div>
);

export default connect(mapStateToProps, { useRecentRefill })(RecentRefills);

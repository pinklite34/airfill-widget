import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { parse, format } from 'libphonenumber-js';
import { useRecentRefill } from '../../../actions';
import { selectInventory } from '../../../store/inventory';

const mapStateToProps = (state, { history }) => {
  const inventory = selectInventory(state).result;

  const items = history.reduce(
    (acc, refill) => {
      const parsedNumber = parse(refill.number);
      const { country } = parsedNumber;

      if (
        (country in inventory && refill.operator in inventory[country].operators)
      ) {
        acc.push({
          ...refill,
          number: format(parsedNumber, 'International'),
          operatorName: inventory[country].operators[refill.operator].name
        });
      }

      return acc;
    },
    []
  );

  return { items };
};

const ButtonContainer = styled.div`
  display: flex;
`;

const RefillButton = styled.a`
  display: block;
  padding: 4px 12px;
  background-color: rgba(0,0,0,0.08);
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.08);
  margin-right: 8px;
`;

const RefillNumber = styled.strong`
  display: block;
  margin-bottom: 2px;
`;
const RefillOperator = styled.span`
  font-size: 12px;
`;

const RecentRefills = ({ items, useRecentRefill }) => (
  <div>
    <h3>Recent refills</h3>
    <ButtonContainer>
      {items.map(refill => (
        <RefillButton onClick={() => useRecentRefill(refill)} key={refill.number}>
          <RefillNumber>{refill.number}</RefillNumber>
          {/*<RefillOperator>{refill.operatorName}</RefillOperator>*/}
        </RefillButton>
      ))}
    </ButtonContainer>
  </div>
);

export default connect(mapStateToProps, { useRecentRefill })(RecentRefills);

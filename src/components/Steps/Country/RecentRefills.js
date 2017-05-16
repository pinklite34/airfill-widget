import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { parse, format } from 'libphonenumber-js';
import { useRecentRefill } from '../../../actions';
import { selectInventory, selectNumber, selectOperator } from '../../../store';

import Spinner from '../../UI/Spinner';

const mapStateToProps = (state, { history }) => {
  const inventory = selectInventory(state).result;
  const selectedNumber = selectNumber(state);
  const operatorIsLoading = selectOperator(state).isLoading;

  const items = history.reduce(
    (acc, { number, operator }) => {
      let country;
      try {
        country = parse(number).country;
      } catch (e) {}

      if (country && country in inventory) {
        const formattedNumber = format(number, 'International');
        const isLoading = formattedNumber === selectedNumber && operatorIsLoading;

        if (operator && operator in inventory[country].operators) {
          acc.push({
            operator,
            isLoading,
            number: formattedNumber
          });
        } else {
          // Allow refill history with invalid/without operator
          acc.push({
            isLoading,
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
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

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

const TinySpinner = styled(Spinner)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  height: 100%;
  padding: 0;

  > * { font-size: inherit; }
`

const RefillNumber = styled.strong``;

const RecentRefills = ({ items, useRecentRefill }) => (
  <div>
    <h3>Recent refills</h3>
    <ButtonContainer>
      {items.map(refill => refill.isLoading ? (
          <RefillButton key={refill.number} disabled>
            <TinySpinner hideText={true} />
            <RefillNumber style={{ opacity: 0 }}>{refill.number}</RefillNumber>
          </RefillButton>
        ) : (
          <RefillButton onClick={() => useRecentRefill(refill)} key={refill.number}>
            <RefillNumber>{refill.number}</RefillNumber>
          </RefillButton>
        )
      )}
    </ButtonContainer>
  </div>
);

export default connect(mapStateToProps, { useRecentRefill })(RecentRefills);

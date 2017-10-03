import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { setOperator } from '../../actions';
import { selectAvailableOperators, selectSelectedOperator } from '../../store';

import ActiveSection from '../UI/ActiveSection';
import Grid from './Grid';
import SuggestedOperator from './SuggestedOperator';

const customLabels = {
  Mobile: 'Mobile phone refill',
  other: 'Other providers'
};

const Picker = ({
  operators,
  setOperator,
  history,
  location,
  selectedOperator
}) => {
  if (!operators) {
    return (
      <ActiveSection>
        Your country is not yet supported in Bitrefill.
      </ActiveSection>
    );
  }

  const { state } = location;

  return (
    <ActiveSection>
      {state &&
      state.suggested && (
        <SuggestedOperator
          operator={selectedOperator}
          onSelect={() => history.push('/selectAmount')}
        />
      )}
      {Object.keys(operators).map(key => (
        <Grid
          key={key}
          title={customLabels[key] || `${key} refill`}
          providers={operators[key]}
          onSelect={operator => {
            setOperator(operator);
            history.push('/selectAmount');
          }}
        />
      ))}
    </ActiveSection>
  );
};

export default connect(
  state => ({
    operators: selectAvailableOperators(state),
    selectedOperator: selectSelectedOperator(state)
  }),
  {
    setOperator
  }
)(Picker);

import React from 'react';
import { connect } from 'react-redux';

import { setOperator } from '../../actions';
import {
  selectAvailableOperators,
  selectSelectedOperator,
  selectCountry
} from '../../store';

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
  selectedOperator,
  country
}) => {
  if (!country) {
    return null;
  }

  const { state } = location;

  return (
    <ActiveSection>
      {state &&
        state.suggested && (
          <SuggestedOperator
            operator={selectedOperator}
            onAccept={() => history.push('/refill/selectAmount')}
            onReject={() => history.replace('/refill/selectProvider')}
          />
        )}
      {Object.keys(operators).map(key => (
        <Grid
          key={key}
          title={customLabels[key] || `${key} refill`}
          providers={operators[key]}
          onSelect={operator => {
            setOperator(operator);
            history.push('/refill/selectAmount');
          }}
        />
      ))}
    </ActiveSection>
  );
};

export default connect(
  state => ({
    operators: selectAvailableOperators(state),
    selectedOperator: selectSelectedOperator(state),
    country: selectCountry(state)
  }),
  {
    setOperator
  }
)(Picker);

import React from 'react'
import { connect } from 'react-redux'

import { setOperator } from '../../actions'
import {
  selectAvailableOperators,
  selectSelectedOperator,
  selectCountry,
  selectNumberLookup,
} from '../../store'

import ActiveSection from '../UI/ActiveSection'
import Grid from './Grid'
import SuggestedOperator from './SuggestedOperator'

const customLabels = {
  Mobile: 'Mobile phone refill',
  other: 'Other providers',
}

const Picker = ({
  operators,
  setOperator,
  history,
  location,
  selectedOperator,
  country,
  numberLookup,
}) => {
  if (!country) {
    return null
  }

  const isNumberLookup = !!numberLookup.altOperators

  const selectOperator = operator => {
    setOperator(operator)
    history.push('/refill/selectAmount')
  }

  if (isNumberLookup) {
    return (
      <ActiveSection>
        <SuggestedOperator
          operator={numberLookup.operator}
          onAccept={() => selectOperator(numberLookup.operator.slug)}
          onReject={() => history.replace('/refill/selectProvider')}
        />
        <Grid
          title={'Available providers'}
          providers={numberLookup.altOperators}
          onSelect={selectOperator}
          defaultShowAll={true}
        />
      </ActiveSection>
    )
  } else {
    return (
      <ActiveSection>
        {Object.keys(operators).map(key => (
          <Grid
            key={key}
            title={customLabels[key] || `${key} refill`}
            providers={operators[key]}
            onSelect={selectOperator}
          />
        ))}
      </ActiveSection>
    )
  }
}

export default connect(
  state => ({
    operators: selectAvailableOperators(state),
    selectedOperator: selectSelectedOperator(state),
    country: selectCountry(state),
    numberLookup: selectNumberLookup(state),
  }),
  {
    setOperator,
  }
)(Picker)

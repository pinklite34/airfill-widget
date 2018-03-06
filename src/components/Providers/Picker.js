import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setOperator } from '../../actions';
import {
  selectAvailableOperators,
  selectSelectedOperator,
  selectCountry,
  selectNumberLookup,
} from '../../store';

import ActiveSection from '../UI/ActiveSection';
import Grid from './Grid';
import SuggestedOperator from './SuggestedOperator';

const customLabels = {
  Mobile: 'Mobile phone refill',
  other: 'Other providers',
};

class Picker extends PureComponent {
  state = {
    showSuggestedOperator: true,
  };

  onSelectSuggestedOperator = () => {
    this.props.setOperator(this.props.numberLookup.operator.slug);
    this.props.history.push('/refill/selectAmount');
  };

  onRejectSuggestedOperator = () =>
    this.setState({ showSuggestedOperator: false }, () =>
      this.props.history.replace('/refill/selectProvider')
    );

  onSelectOperator = operator => {
    this.props.setOperator(operator);
    this.props.history.push('/refill/selectAmount');
  };

  render() {
    const { operators, country, numberLookup } = this.props;
    const { showSuggestedOperator } = this.state;
    const isNumberLookup = !!numberLookup.altOperators;

    return country ? (
      isNumberLookup ? (
        <ActiveSection>
          {showSuggestedOperator ? (
            <SuggestedOperator
              operator={numberLookup.operator}
              onAccept={this.onSelectSuggestedOperator}
              onReject={this.onRejectSuggestedOperator}
            />
          ) : null}
          <Grid
            title={'Available operators'}
            providers={numberLookup.altOperators}
            onSelect={this.onSelectOperator}
            defaultShowAll={true}
          />
        </ActiveSection>
      ) : (
        <ActiveSection>
          {Object.keys(operators).map(key => (
            <Grid
              key={key}
              title={customLabels[key] || `${key} refill`}
              providers={operators[key]}
              onSelect={this.onSelectOperator}
            />
          ))}
        </ActiveSection>
      )
    ) : null;
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
)(Picker);

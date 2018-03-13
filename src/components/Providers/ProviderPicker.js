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
import ProviderGrid from './ProviderGrid';
import ProviderSuggested from './ProviderSuggested';
import {
  numberLookupProp,
  historyProp,
  operatorsProp,
  countryProp,
  fnProp,
} from '../../lib/prop-types';

const customLabels = {
  Mobile: 'Mobile phone refill',
  other: 'Other providers',
};

class ProviderPicker extends PureComponent {
  static propTypes = {
    numberLookup: numberLookupProp,
    history: historyProp,
    setOperator: fnProp,
    operators: operatorsProp,
    country: countryProp,
  };

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
            <ProviderSuggested
              operator={numberLookup.operator}
              onAccept={this.onSelectSuggestedOperator}
              onReject={this.onRejectSuggestedOperator}
            />
          ) : null}
          <ProviderGrid
            title={'Available operators'}
            providers={numberLookup.altOperators}
            onSelect={this.onSelectOperator}
            defaultShowAll={true}
          />
        </ActiveSection>
      ) : (
        <ActiveSection>
          {Object.keys(operators).map(key => (
            <ProviderGrid
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
)(ProviderPicker);
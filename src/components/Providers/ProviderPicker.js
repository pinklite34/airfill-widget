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
  configProp,
} from '../../lib/prop-types';

const displayOrder = [null, 'pin'];

const getDisplayText = key => {
  const lower = key ? key.toLowerCase() : null;

  switch (lower) {
    case 'pin':
      return 'Phone refill vouchers / PINs';
    case 'voucher':
      return 'Vouchers';
    case 'dth':
      return 'Digital Television (DTH)';
    case 'data':
      return 'Data bundles';
    case 'sms':
      return 'SMS bundles';
    case 'other':
      return 'Other products';
    case null:
      return 'Prepaid phones';
    default:
      return key + ' Refill';
  }
};

class ProviderPicker extends PureComponent {
  static propTypes = {
    numberLookup: numberLookupProp,
    history: historyProp,
    setOperator: fnProp,
    operators: operatorsProp,
    country: countryProp,
    config: configProp,
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
          {Object.keys(operators)
            .sort((a, b) => {
              if (a.toLowerCase() === 'other') {
                return 1;
              }

              return displayOrder.indexOf(a) - displayOrder.indexOf(b);
            })
            .map(key => (
              <ProviderGrid
                key={key}
                title={getDisplayText(key)}
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

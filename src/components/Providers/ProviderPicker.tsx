import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';

import { setOperator } from '../../actions';
import { trackProductEvent } from '../../actions/analytics-actions';
import { CountryProp, NumberLookup, Operator } from '../../lib/prop-types';
import {
  selectAvailableOperators,
  selectCountry,
  selectNumberLookup,
  selectSelectedOperator,
} from '../../store';
import ActiveSection from '../UI/ActiveSection';
import ProviderGrid from './ProviderGrid';
import ProviderSuggested from './ProviderSuggested';

const displayOrder = ['refill', 'pin'];

const getDisplayText = key => {
  switch (key) {
    case 'pin':
      return {
        id: 'provider.type.pin',
        children: 'Phone refill vouchers / PINs',
      };
    case 'dth':
      return { id: 'provider.type.dth', children: 'Digital Television (DTH)' };
    case 'data':
      return { id: 'provider.type.data', children: 'Data bundles' };
    case 'sms':
      return { id: 'provider.type.sms', children: 'SMS bundles' };
    case 'voip':
      return { id: 'provider.type.voip', children: 'VoIP' };
    case 'other':
      return { id: 'provider.type.other', children: 'Other products' };
    case 'refill':
      return { id: 'provider.type.refill', children: 'Prepaid phones' };
    case 'games':
      return { id: 'provider.type.games', children: 'Games' };
    case 'travel':
      return { id: 'provider.type.travel', children: 'Travel' };
    default:
      return `${key[0].toUpperCase()}${key.substr(1)}`;
  }
};

interface ProviderPickerProps {
  numberLookup: NumberLookup;
  history: History;
  setOperator: typeof setOperator;
  operators: Operator[];
  country: CountryProp;
  trackProductEvent: typeof trackProductEvent;
}

class ProviderPicker extends React.PureComponent<ProviderPickerProps> {
  state = {
    showSuggestedOperator: true,
  };

  onSelectSuggestedOperator = () => {
    const {
      numberLookup,
      setOperator,
      trackProductEvent,
      history,
    } = this.props;
    const operatorSlug = numberLookup.operator.slug;
    setOperator(operatorSlug);
    trackProductEvent('Product Clicked', operatorSlug);
    history.push('/refill/selectAmount');
  };

  onRejectSuggestedOperator = () => {
    const { history } = this.props;
    this.setState({ showSuggestedOperator: false }, () =>
      history.replace('/refill/selectProvider')
    );
  };

  onSelectOperator = operator => {
    const { trackProductEvent, setOperator, history } = this.props;
    setOperator(operator);
    trackProductEvent('Product Clicked', operator);
    history.push('/refill/selectAmount');
  };

  render() {
    const { operators, country, numberLookup } = this.props;
    const { showSuggestedOperator } = this.state;
    const isNumberLookup = !!numberLookup.altOperators;

    return country ? (
      isNumberLookup ? (
        <ActiveSection padding="16px">
          {showSuggestedOperator ? (
            <ProviderSuggested
              operator={numberLookup.operator}
              onAccept={this.onSelectSuggestedOperator}
              onReject={this.onRejectSuggestedOperator}
            />
          ) : null}
          <ProviderGrid
            title={{
              id: 'title.availableoperators',
              children: 'Available operators',
            }}
            providers={numberLookup.altOperators}
            onSelect={this.onSelectOperator}
            defaultShowAll={true}
          />
        </ActiveSection>
      ) : (
        <ActiveSection padding="16px">
          {Object.keys(operators)
            .sort((a, b) => {
              if (a === 'other') {
                return 1;
              }

              return (displayOrder as any).includes(a) &&
                (displayOrder as any).includes(b)
                ? displayOrder.indexOf(a) - displayOrder.indexOf(b)
                : displayOrder.indexOf(b) - displayOrder.indexOf(a);
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
    trackProductEvent,
  }
)(ProviderPicker);

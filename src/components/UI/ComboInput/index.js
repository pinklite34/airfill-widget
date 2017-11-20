import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Downshift from 'downshift';

import {
  selectCountryList,
  selectCountry,
  selectNumber,
  selectAvailableOperators,
  selectRecentNumbers
} from '../../../store';
import {
  setCountry,
  setNumber,
  setOperator,
  useRecentRefill
} from '../../../actions';
import {
  isPhoneNumber,
  removeNextDigit,
  removePreviousDigit,
  formatNumber
} from '../../../lib/number-input-helpers';
import {
  sectionsToItemList,
  virtualIndexToItemIndex
} from '../../../lib/comboinput-helpers';

import Dropdown from './Dropdown';
import InputRow from './InputRow';

const styles = {
  container: css({
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    color: '#444',
    overflow: 'visible'
  })
};

const itemToString = item => {
  if (!item) {
    return null;
  }

  // Country
  if (item.alpha2) {
    return item.name;
  }

  return item;
};

class ComboInput extends Component {
  state = {
    inputValue: this.props.number || ''
  };

  changeValue = (inputValue, currentCaret) => {
    if (isPhoneNumber(inputValue)) {
      const { formattedValue, number, country, caret } = formatNumber(
        this.props.country && this.props.country.alpha2,
        inputValue,
        currentCaret
      );

      this.props.setCountry(country);

      this.props.setNumber(number);
      this.setState({ inputValue: formattedValue }, () =>
        this.input.setSelectionRange(caret, caret)
      );
    } else {
      if (this.props.country && !inputValue) {
        this.props.setNumber('');
      }
      this.setState(state => ({
        inputValue
      }));
    }
  };

  handleSelect = item => {
    if (item.__type === 'country') {
      this.props.setCountry(item.alpha2);
      this.setState({
        inputValue: this.props.number || ''
      });
    } else if (item.__type === 'provider') {
      this.props.setOperator(item.slug);
      this.props.history.push('/refill/selectAmount');
    } else if (item.__type === 'history') {
      this.props.useRecentRefill(item);
      this.props.history.push('/refill/selectAmount');
    }
  };

  resetCountry = openMenu => () => {
    this.props.setCountry('');
    this.setState({ inputValue: '' });
    this.input.focus();
    openMenu && openMenu();
  };

  setInputRef = ref => (this.input = ref);
  onInputKeyDown = openMenu => e => {
    const { selectionStart, selectionEnd } = e.target;
    const selectionRange = selectionEnd - selectionStart;

    if (e.keyCode === 8) {
      // Handle backspace
      if (!e.target.value.length) {
        this.resetCountry(null)();
      } else if (isPhoneNumber(e.target.value)) {
        if (!selectionRange) {
          e.preventDefault();
          this.changeValue(
            removePreviousDigit(e.target.value, selectionStart),
            selectionStart - 1
          );
        }
      }
    } else if (e.keyCode === 46) {
      // Delete key
      if (!selectionRange) {
        e.preventDefault();
        this.changeValue(
          removeNextDigit(e.target.value, selectionStart),
          selectionStart
        );
      }
    } else if (e.keyCode === 13) {
      if (isPhoneNumber(e.target.value)) {
        this.props.onSubmit();
      }
    }
  };

  getMatchingCountries = value => {
    const { countryList } = this.props;
    return countryList
      .filter(country => country.name.toLowerCase().indexOf(value) > -1)
      .map(item => ({ ...item, __type: 'country', key: item.alpha2 }));
  };

  getMatchingOperators = value => {
    const { operators } = this.props;
    return Object.keys(operators)
      .reduce(
        (matches, type) =>
          matches.concat(
            operators[type].filter(
              operator => operator.name.toLowerCase().indexOf(value) > -1
            )
          ),
        []
      )
      .map(item => ({ ...item, __type: 'provider', key: item.slug }));
  };

  getMatchingRecentNumbers = value => {
    const { recentNumbers } = this.props;
    return recentNumbers
      .filter(recentNumber => !value || recentNumber.number.indexOf(value) > -1)
      .map(item => ({
        ...item,
        __type: 'history',
        key: `${item.operator}-${item.number}`
      }));
  };

  getMatchingItems = () => {
    const { country } = this.props;

    const normalizedInputValue = this.state.inputValue.toLowerCase();

    return [
      ...this.getMatchingRecentNumbers(normalizedInputValue),
      ...(!country ? this.getMatchingCountries(normalizedInputValue) : []),
      ...(country ? this.getMatchingOperators(normalizedInputValue) : [])
    ];
  };

  render() {
    const { inputValue } = this.state;

    const { country, onSubmit, loading } = this.props;

    const normalizedInputValue = this.state.inputValue.toLowerCase();
    const countries = country
      ? []
      : this.getMatchingCountries(normalizedInputValue);
    const operators = this.getMatchingOperators(normalizedInputValue);
    const recentNumbers = country
      ? []
      : this.getMatchingRecentNumbers(normalizedInputValue);

    const sections = [recentNumbers, countries, operators];
    const titles = ['Recent refills', 'Countries', 'Providers'];

    const items = sectionsToItemList(sections, titles).map((item, index) => ({
      ...item,
      index: virtualIndexToItemIndex(sections, index)
    }));

    const itemCount =
      countries.length + operators.length + recentNumbers.length;

    return (
      <Downshift
        onChange={this.handleSelect}
        inputValue={inputValue}
        itemToString={itemToString}
        selectedItem={null}
        itemCount={itemCount}
      >
        {({
          getInputProps,
          getItemProps,
          inputValue,
          highlightedIndex,
          isOpen,
          openMenu
        }) => (
          <div {...styles.container}>
            <InputRow
              getInputProps={getInputProps}
              onChange={this.changeValue}
              country={country && country.alpha2}
              resetCountry={this.resetCountry(openMenu)}
              inputRef={this.setInputRef}
              onKeyDown={this.onInputKeyDown(openMenu)}
              loading={loading}
              onSubmit={onSubmit}
            />
            {isOpen && itemCount ? (
              <Dropdown
                getItemProps={getItemProps}
                items={items}
                highlightedIndex={highlightedIndex || 0}
              />
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

export default connect(
  state => ({
    operators: selectAvailableOperators(state),
    country: selectCountry(state),
    countryList: selectCountryList(state),
    number: selectNumber(state),
    recentNumbers: selectRecentNumbers(state)
  }),
  {
    setCountry,
    setNumber,
    setOperator,
    useRecentRefill
  }
)(ComboInput);

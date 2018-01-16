import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Downshift from 'downshift';

import {
  selectCountryList,
  selectCountry,
  selectNumber,
  selectAvailableOperators,
  selectRecentNumbers,
  selectComboInputOpen,
  selectComboInputFocus
} from '../../../store';
import {
  setCountry,
  setNumber,
  setOperator,
  useRecentRefill,
  openComboInput,
  closeComboInput,
  setComboInputFocus
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
  if (item.__type === 'country') {
    return item.name;
  }

  return item;
};

const getInitialInputValue = (country, number) => {
  const result = formatNumber(country, number, number.length);

  if (result && result.formattedValue) {
    return result.formattedValue;
  } else {
    return '';
  }
};

class ComboInput extends Component {
  state = {
    inputValue: getInitialInputValue(
      this.props.country && this.props.country.alpha2,
      this.props.number
    )
  };

  focusInput = () => {
    if (this.input) {
      this.setState({ inputValue: '' }, () => {
        this.input.focus();
        this.props.setComboInputFocus(false);
      });
    }
  };

  componentDidMount() {
    if (this.props.shouldFocus) {
      this.focusInput();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldFocus) {
      this.focusInput();
    }
  }

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

  resetCountry = () => {
    this.props.setCountry('');
    this.setState({ inputValue: '' });
    this.input.focus();
    this.props.openComboInput();
  };

  setInputRef = ref => (this.input = ref);
  onInputKeyDown = e => {
    const { selectionStart, selectionEnd } = e.target;
    const selectionRange = selectionEnd - selectionStart;

    if (e.keyCode === 8) {
      // Handle backspace
      if (!e.target.value.length) {
        this.resetCountry();
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
      this.handleSubmit();
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

  getMatchingRecentNumbers = (value, countryCode) => {
    const { recentNumbers, countryList } = this.props;
    const country = countryCode
      ? countryList.find(country => country.alpha2 === countryCode)
      : null;

    return recentNumbers
      .filter(recentNumber => {
        if (!country && !value) {
          // No filtering enabled, show everything
          return true;
        } else if (country && !country.operators[recentNumber.operator]) {
          // Don't show recent refills of other countries but the selected one
          return false;
        } else if (recentNumber.number.indexOf(value) > -1) {
          // Show recent refills with matching phone number
          return true;
        } else {
          // Don't show anything else
          return false;
        }
      })
      .filter(
        recentNumber =>
          !!countryList.find(c => c.operators[recentNumber.operator])
      )
      .map(item => ({
        ...item,
        __type: 'history',
        key: `${item.operator}-${item.number}`
      }));
  };

  handleSubmit = () => {
    if (isPhoneNumber(this.state.inputValue)) {
      this.props.onSubmit();
    }
  };

  handleStateChange = changes => {
    if (changes.hasOwnProperty('isOpen')) {
      if (changes.isOpen) {
        this.props.openComboInput();
      } else {
        this.props.closeComboInput();
      }
    }
  };

  render() {
    const { inputValue } = this.state;

    const { country, loading, isOpen, openComboInput } = this.props;

    const normalizedInputValue = this.state.inputValue.toLowerCase();
    const countries = country
      ? []
      : this.getMatchingCountries(normalizedInputValue);
    const operators = this.getMatchingOperators(normalizedInputValue);
    const recentNumbers = this.getMatchingRecentNumbers(
      normalizedInputValue,
      country && country.alpha2
    );

    const sections = [recentNumbers, countries, operators];
    const titles = ['Recent refills', 'Countries', 'Providers'];

    const items = sectionsToItemList(sections, titles).map((item, index) => ({
      ...item,
      index: virtualIndexToItemIndex(sections, index)
    }));

    const itemCount =
      countries.length + operators.length + recentNumbers.length;

    const submitEnabled = isPhoneNumber(this.state.inputValue);

    return (
      <Downshift
        onChange={this.handleSelect}
        inputValue={inputValue}
        itemToString={itemToString}
        selectedItem={null}
        itemCount={itemCount}
        isOpen={isOpen}
        onStateChange={this.handleStateChange}
      >
        {({ getInputProps, getItemProps, inputValue, highlightedIndex }) => (
          <div {...styles.container}>
            <InputRow
              getInputProps={getInputProps}
              onChange={this.changeValue}
              country={country && country.alpha2}
              resetCountry={this.resetCountry}
              inputRef={this.setInputRef}
              onKeyDown={this.onInputKeyDown}
              loading={loading}
              onSubmit={this.handleSubmit}
              submitEnabled={submitEnabled}
              onFocus={openComboInput}
            />
            {isOpen && itemCount ? (
              <Dropdown
                getItemProps={getItemProps}
                items={items}
                highlightedIndex={highlightedIndex}
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
    recentNumbers: selectRecentNumbers(state),
    isOpen: selectComboInputOpen(state),
    shouldFocus: selectComboInputFocus(state)
  }),
  {
    openComboInput,
    closeComboInput,
    setComboInputFocus,
    setCountry,
    setNumber,
    setOperator,
    useRecentRefill
  }
)(ComboInput);

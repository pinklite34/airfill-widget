import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Downshift from 'downshift';

import {
  selectCountryList,
  selectCountry,
  selectNumber,
  selectAvailableOperators
} from '../../../store';
import { setCountry, setNumber, setOperator } from '../../../actions';
import {
  isPhoneNumber,
  removeNextDigit,
  removePreviousDigit,
  formatNumber
} from '../../../lib/number-input-helpers';

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

// These countries/areas don't have "real" ISO codes. This means there's no flag
// library that includes their flags etc. We need some kind of special treatment
// to allow for these to be selected. This is just a workaround to get anything
// to render.
const nonIsoCountries = {
  EA: 'Ceuta, Melilla',
  XK: 'Kosovo',
  CS: 'Serbia and Montenegro',
  AN: 'Netherlands Antilles'
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
    inputValue: ''
  };

  changeValue = (inputValue, currentCaret) => {
    if (isPhoneNumber(inputValue)) {
      const { formattedValue, number, country, caret } = formatNumber(
        this.props.country,
        inputValue,
        currentCaret
      );

      if (
        country &&
        this.props.country &&
        country !== this.props.country.alpha2
      ) {
        this.props.setCountry(country);
      }

      this.props.setNumber(number);
      this.setState({ inputValue: formattedValue }, () =>
        this.input.setSelectionRange(caret, caret)
      );
    } else {
      this.setState(state => ({
        inputValue
      }));
    }
  };

  handleSelect = item => {
    if (item.alpha2) {
      this.props.setCountry(item.alpha2);
      this.setState({
        inputValue: ''
      });
    } else if (item.slug) {
      this.props.setOperator(item.slug);
      this.props.history.push('/selectAmount');
    }
  };

  resetCountry = openMenu => () => {
    this.props.setCountry('');
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

  getMatchingItems = () => {
    const { country, countryList, operators } = this.props;

    const normalizedInputValue = this.state.inputValue.toLowerCase();

    if (!country) {
      return countryList
        .filter(
          country =>
            country.name.toLowerCase().indexOf(normalizedInputValue) !== -1
        )
        .map(item => ({ ...item, __type: 'country' }));
    } else if (countryList.find(c => c.alpha2 === country.alpha2)) {
      return Object.keys(operators)
        .reduce(
          (reduced, type) =>
            reduced.concat(
              operators[type].filter(
                operator =>
                  operator.name.toLowerCase().indexOf(normalizedInputValue) !==
                  -1
              )
            ),
          []
        )
        .map(item => ({ ...item, __type: 'provider' }));
    } else {
      return [];
    }
  };

  render() {
    const { inputValue } = this.state;

    const { country, onSubmit, loading } = this.props;

    const items = this.getMatchingItems();

    return (
      <Downshift
        onChange={this.handleSelect}
        inputValue={inputValue}
        itemToString={itemToString}
        selectedItem={null}
        itemCount={items.length}
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
            {isOpen && items.length ? (
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
    number: selectNumber(state)
  }),
  {
    setCountry,
    setNumber,
    setOperator
  }
)(ComboInput);

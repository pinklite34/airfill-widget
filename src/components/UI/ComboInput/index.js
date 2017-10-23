import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Downshift from 'downshift';

import { Card } from 'react-toolbox/lib/card';

import {
  selectCountryList,
  selectCountryCode,
  selectNumber
} from '../../../store';
import { setCountry, setNumber } from '../../../actions';

import Dropdown from './Dropdown';
import InputRow from './InputRow';
import Check from '../check.svg';

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
    inputValue: '',
    isOpen: false
  };

  changeValue = inputValue => {
    this.setState(state => ({
      inputValue,
      isOpen: inputValue ? true : state.isOpen
    }));
  };

  handleSelect = item => {
    console.log('Selected', item);

    if (item.alpha2) {
      this.props.setCountry(item.alpha2);
    }
    this.setState({
      inputValue: '',
      isOpen: false
    });
  };

  resetCountry = () => {
    this.props.setCountry('');
    this.input.focus();
    this.setState({
      isOpen: true
    });
  };

  setInputRef = ref => (this.input = ref);
  onInputKeyDown = e => {
    // Handle backspace
    if (!e.target.value.length && e.keyCode === 8) {
      this.resetCountry();
    }
  };

  render() {
    const { inputValue, isOpen } = this.state;

    const { countryList, country } = this.props;
    const filteredCountries = countryList.filter(
      c => c.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    );

    return (
      <Downshift
        onChange={this.handleSelect}
        inputValue={inputValue}
        itemToString={itemToString}
        isOpen={isOpen}
      >
        {({
          getInputProps,
          getItemProps,
          inputValue,
          highlightedIndex,
          isOpen
        }) => (
          <div {...styles.container}>
            <InputRow
              getInputProps={getInputProps}
              onChange={this.changeValue}
              country={country}
              resetCountry={this.resetCountry}
              inputRef={this.setInputRef}
              onKeyDown={this.onInputKeyDown}
            />
            {isOpen && filteredCountries.length ? (
              <Dropdown
                getItemProps={getItemProps}
                countries={filteredCountries}
                providers={[]}
                history={[]}
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
    country: selectCountryCode(state),
    countryList: selectCountryList(state),
    number: selectNumber(state)
  }),
  {
    setCountry,
    setNumber
  }
)(ComboInput);

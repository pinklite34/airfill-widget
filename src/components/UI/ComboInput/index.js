import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { css } from 'glamor';
import Downshift from 'downshift';

import {
  selectCountryList,
  selectCountry,
  selectNumber,
  selectAvailableOperators,
  selectRecentNumbers,
  selectComboInputOpen,
  selectComboInputFocus,
} from '../../../store';
import {
  setCountry,
  setNumber,
  setOperator,
  useRecentRefill,
  openComboInput,
  closeComboInput,
  setComboInputFocus,
} from '../../../actions';
import {
  isPhoneNumber,
  removeNextDigit,
  removePreviousDigit,
  formatNumber,
} from '../../../lib/number-input-helpers';
import {
  sectionsToItemList,
  virtualIndexToItemIndex,
} from '../../../lib/comboinput-helpers';

import Dropdown from './Dropdown';
import InputRow from './InputRow';

const styles = {
  container: css({
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    color: '#444',
    overflow: 'visible',
  }),
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

const countryShape = PropTypes.shape({
  alpha2: PropTypes.string,
  name: PropTypes.string,
  operators: PropTypes.object,
});

class ComboInput extends PureComponent {
  static propTypes = {
    closeComboInput: PropTypes.func.isRequired,
    country: countryShape,
    countryOnly: PropTypes.bool,
    countryList: PropTypes.arrayOf(countryShape).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    number: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    openComboInput: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    isOpen: PropTypes.bool,
    recentNumbers: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.string,
        operator: PropTypes.string,
      })
    ),
    setComboInputFocus: PropTypes.func.isRequired,
    setCountry: PropTypes.func.isRequired,
    setNumber: PropTypes.func.isRequired,
    setOperator: PropTypes.func.isRequired,
    shouldFocus: PropTypes.bool,
    useRecentRefill: PropTypes.func.isRequired,
  };

  state = {
    inputValue: this.props.countryOnly
      ? ''
      : getInitialInputValue(
          this.props.country && this.props.country.alpha2,
          this.props.number
        ),
  };

  componentDidMount() {
    if (this.props.shouldFocus) this.focusInput();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldFocus) this.focusInput();
  }

  componentDidUpdate() {
    if (isPhoneNumber(this.state.inputValue)) {
      this.input &&
        this.input.setSelectionRange(this.state.caret, this.state.caret);
    }
  }

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

  handleSelect = item => {
    if (item.__type === 'country') {
      this.props.setCountry(item.alpha2);
      this.setState({
        inputValue: this.props.number || '',
      });
    } else if (item.__type === 'provider') {
      this.props.setOperator(item.slug);
      this.props.history.push('/refill/selectAmount');
    } else if (item.__type === 'history') {
      this.props.useRecentRefill(item);
      this.props.history.push('/refill/selectAmount');
    }
  };

  handleSubmit = () => {
    if (isPhoneNumber(this.state.inputValue)) this.props.onSubmit();
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

  setInputRef = ref => (this.input = ref);

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
        key: `${item.operator}-${item.number}`,
      }));
  };

  focusInput = () => {
    if (this.input) {
      this.setState({ inputValue: '' }, () => {
        this.input.focus();
        this.props.setComboInputFocus(false);
      });
    }
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
      this.setState(
        { inputValue: formattedValue },
        () => this.input && this.input.setSelectionRange(caret, caret)
      );
    } else {
      if (this.props.country && !inputValue) {
        this.props.setNumber('');
      }
      this.setState(state => ({
        inputValue,
      }));
    }
  };

  resetCountry = () => {
    this.props.setCountry('');
    this.setState({ inputValue: '' });
    this.input.focus();
    this.props.openComboInput();
  };

  render() {
    const { inputValue } = this.state;

    const {
      countryOnly,
      country,
      loading,
      isOpen,
      openComboInput,
    } = this.props;

    if (countryOnly && country && country.alpha2) {
      return <Redirect to="/refill/selectProvider" />;
    }

    const normalizedInputValue = this.state.inputValue.toLowerCase();
    const countries = country
      ? []
      : this.getMatchingCountries(normalizedInputValue);
    const operators = this.getMatchingOperators(normalizedInputValue);
    const recentNumbers = this.getMatchingRecentNumbers(
      normalizedInputValue,
      country && country.alpha2
    );

    const sections = countryOnly
      ? [recentNumbers, countries]
      : [recentNumbers, countries, operators];

    const titles = countryOnly
      ? ['Recent refills', 'Countries']
      : ['Recent refills', 'Countries', 'Services'];

    const items = sectionsToItemList(sections, titles).map((item, index) => ({
      ...item,
      index: virtualIndexToItemIndex(sections, index),
    }));

    const itemCount =
      countries.length + operators.length + recentNumbers.length;

    const isPhoneNo = isPhoneNumber(this.state.inputValue);
    const shouldDefaultToTel =
      !countryOnly &&
      (isPhoneNo || (country != null && !this.state.inputValue));

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
              submitEnabled={isPhoneNo}
              onFocus={openComboInput}
              type={shouldDefaultToTel ? 'tel' : 'text'}
              countryOnly={countryOnly}
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
    shouldFocus: selectComboInputFocus(state),
  }),
  {
    openComboInput,
    closeComboInput,
    setComboInputFocus,
    setCountry,
    setNumber,
    setOperator,
    useRecentRefill,
  }
)(ComboInput);

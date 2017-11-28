import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import {
  selectNumber,
  selectNumberLookup,
  selectIsNumberLookup,
  selectCountryCode
} from '../../store';
import { lookupNumber, setNumber } from '../../actions';

import { Card } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import {
  formatNumber,
  removeNextDigit,
  removePreviousDigit,
  isPhoneNumber
} from '../../lib/number-input-helpers';

import Phone from '../UI/phone.svg';
import Check from '../UI/check.svg';
import Close from '../UI/close.svg';
import CollapsedSection from '../UI/CollapsedSection';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 350
  }),
  card: css({
    margin: -8,
    padding: 12,
    maxWidth: 350
  }),
  input: css({
    flex: '1 0 auto',
    background: 'none',
    fontSize: 16,
    border: 0,
    '&:focus': {
      outline: 'none'
    },
    '&::placeholder': {
      color: 'rgba(0,0,0,.26)'
    }
  }),
  icon: css({
    width: 24,
    height: 24,
    margin: '-3px 0',
    fill: '#3e8fe4',
    marginRight: 12,
    flex: '0 0 auto'
  }),
  text: css({
    fontWeight: 500
  }),
  button: css({
    backgroundColor: '#F0F6FA !important',
    color: '#3E8FE4 !important',
    minWidth: '48px !important',
    height: 'auto !important',
    display: 'flex !important',
    '& svg': {
      marginRight: '0 !important'
    },
    margin: -12,
    marginLeft: 0,
    alignSelf: 'stretch',
    flex: '0 0 auto'
  }),
  buttonDisabled: css({
    color: '#cccccc !important'
  }),
  progressBar: css({
    width: '24px !important',
    height: '24px !important'
  }),
  error: css({
    backgroundColor: '#E1283C',
    margin: -12,
    marginRight: 0,
    padding: 8,
    color: '#fff',
    flex: '0 1 auto',
    fontWeight: 500
  }),
  errorButton: css({
    color: '#E1283C !important'
  })
};

class Collapsed extends Component {
  state = {
    inputValue: '',
    isEditable: false,
    showError: false
  };

  changeValue = (inputValue, currentCaret) => {
    if (isPhoneNumber(inputValue)) {
      const { formattedValue, caret } = formatNumber(
        this.props.country && this.props.country.alpha2,
        inputValue,
        currentCaret
      );

      this.setState({ inputValue: formattedValue }, () =>
        this.input.setSelectionRange(caret, caret)
      );
    } else if (!inputValue) {
      this.setState({ inputValue: '' });
    } else {
      this.input.setSelectionRange(currentCaret, currentCaret);
    }
  };

  handleInputChange = e =>
    this.changeValue(e.target.value, e.target.selectionStart);

  onKeyDown = e => {
    const { selectionStart, selectionEnd } = e.target;
    const selectionRange = selectionEnd - selectionStart;

    if (e.keyCode === 8) {
      // Handle backspace
      if (!selectionRange) {
        e.preventDefault();
        this.changeValue(
          removePreviousDigit(e.target.value, selectionStart),
          selectionStart - 1
        );
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
    }
  };

  setInputRef = ref => (this.input = ref);
  enableInput = () => {
    const number = formatNumber(
      this.props.countryCode,
      this.props.number,
      this.props.number.length
    );

    this.setState(
      {
        isEditable: true,
        inputValue: number.formattedValue
      },
      () => this.input.setSelectionRange(number.caret, number.caret)
    );
  };
  disableInput = () => this.setState({ isEditable: false, error: false });
  hideError = () => this.setState({ showError: false });

  handleSubmit = () => {
    const { lookupNumber, history } = this.props;
    const { inputValue } = this.state;

    lookupNumber(inputValue).then(
      () => {
        this.disableInput();
        this.props.setNumber(inputValue);
        history.push('/refill/selectProvider');
      },
      () => this.setState({ showError: true })
    );
  };

  render() {
    const { darken, number, isNumberLookup, numberLookup } = this.props;
    const { isEditable, inputValue, showError } = this.state;

    if (!isNumberLookup) {
      return null;
    }

    const submitEnabled = isPhoneNumber(inputValue);
    const loading = numberLookup.isLoading;

    return (
      <CollapsedSection
        darken={darken}
        onClick={this.enableInput}
        type="number"
        hideButton={isEditable}
      >
        {isEditable ? (
          <Card {...styles.card}>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.handleSubmit();
              }}
            >
              {showError ? (
                <div {...styles.container}>
                  <div {...styles.error}>{numberLookup.error}</div>
                  <Button
                    onClick={this.hideError}
                    {...css([styles.button, styles.errorButton])}
                  >
                    <Close />
                  </Button>
                </div>
              ) : (
                <div {...styles.container}>
                  <Phone {...styles.icon} />
                  <input
                    type="phone"
                    value={inputValue}
                    onChange={this.handleInputChange}
                    autoFocus
                    {...styles.input}
                    ref={this.setInputRef}
                    onKeyDown={this.onKeyDown}
                  />
                  <Button
                    disabled={loading || !submitEnabled}
                    {...css([
                      styles.button,
                      !submitEnabled && styles.buttonDisabled
                    ])}
                    type="submit"
                  >
                    {loading ? (
                      <ProgressBar
                        type="circular"
                        className={`${styles.progressBar}`}
                      />
                    ) : (
                      <Check />
                    )}
                  </Button>
                </div>
              )}
            </form>
          </Card>
        ) : (
          <div {...styles.container}>
            <Phone {...styles.icon} />
            <div {...styles.text}>{number}</div>
          </div>
        )}
      </CollapsedSection>
    );
  }
}

export default connect(
  state => ({
    countryCode: selectCountryCode(state),
    number: selectNumber(state),
    isNumberLookup: selectIsNumberLookup(state),
    numberLookup: selectNumberLookup(state)
  }),
  {
    setNumber,
    lookupNumber
  }
)(Collapsed);

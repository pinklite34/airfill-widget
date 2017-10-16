import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';

import {
  selectCountryList,
  selectCountryCode,
  selectNumber
} from '../../store';
import { setCountry, setNumber } from '../../actions';

import Phone from 'react-phone-number-input';
import SelectCountry from './SelectCountry';

import Check from './check.svg';

import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';

const styles = {
  container: css({
    display: 'flex !important',
    flexDirection: 'row !important',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    maxWidth: '400px',
    color: '#444'
  }),
  selectCountry: css({
    position: 'relative',
    textDecoration: 'underline',
    margin: 16
  }),
  button: css({
    backgroundColor: '#F0F6FA !important',
    color: '#3E8FE4 !important',
    minWidth: '48px !important',
    height: 'auto !important',
    display: 'flex !important',
    '& svg': {
      marginRight: '0 !important'
    }
  }),
  phone: css({
    flex: '1 0 auto',
    alignItems: 'center',
    '& .rrui__select': {
      marginRight: '0 !important',
      '& .rrui__input': {
        height: 'auto',
        '& .rrui__select__native': {
          height: '48px',
          width: '48px !important'
        },
        '& .react-phone-number-input__icon': {
          height: 'auto',
          width: '16px',
          padding: '0',
          '& svg': {
            display: 'block'
          }
        },
        '& button.rrui__select__button': {
          border: 'none !important',
          padding: '16px',
          '& .rrui__select__button-label': {
            display: 'flex',
            justifyContent: 'center',
            height: '16px'
          }
        },
        '& .rrui__select__arrow': {
          display: 'none'
        }
      }
    },
    '& input.rrui__input-field': {
      border: 'none !important'
    }
  }),
  progressBar: css({
    width: '24px !important',
    height: '24px !important'
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

const NumberInput = ({
  country,
  setCountry,
  countryList,
  setNumber,
  number,
  onSubmit,
  loading
}) => {
  if (!countryList.length) {
    return null;
  }

  if (countryList.find(c => c.alpha2 === country)) {
    return (
      <Card {...styles.container}>
        <Phone
          placeholder="Enter a phone number"
          onChange={setNumber}
          value={number}
          className={`${styles.phone}`}
          country={country}
          countries={countryList.map(c => c.alpha2)}
          dictionary={nonIsoCountries}
          onCountryChange={setCountry}
          nativeExpanded
        />
        <Button disabled={loading} {...styles.button} onClick={onSubmit}>
          {loading ? (
            <ProgressBar type="circular" className={`${styles.progressBar}`} />
          ) : (
            <Check />
          )}
        </Button>
      </Card>
    );
  } else {
    return (
      <Card {...styles.container}>
        <div>
          <p {...styles.selectCountry}>
            <SelectCountry />
            <strong>Select country</strong>
          </p>
        </div>
      </Card>
    );
  }
};

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
)(NumberInput);

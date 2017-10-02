import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';

import {
  selectCountryList,
  selectCountryCode,
  selectNumber
} from '../../store';
import { setCountry, setNumber } from '../../actions';

import Phone from 'react-phone-number-input';
import Check from './check.svg';

import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';

const style = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: '',
    maxWidth: '400px'
  }),
  button: css({
    backgroundColor: '#F0F6FA !important',
    color: '#3E8FE4 !important',
    minWidth: '48px !important',
    height: 'auto !important',
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
        '& button.rrui__select__selected': {
          border: 'none !important',
          padding: '16px',
          '& .rrui__select__selected-label': {
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
  onSubmit
}) => {
  if (!countryList.length) {
    return null;
  }
  return (
    <Card {...style.container}>
      <Phone
        placeholder="Enter a phone number"
        onChange={setNumber}
        value={number}
        className={`${style.phone}`}
        country={country}
        countries={countryList.map(c => c.alpha2)}
        dictionary={nonIsoCountries}
        onCountryChange={setCountry}
        nativeExpanded
      />
      <Button {...style.button} onClick={onSubmit}>
        <Check />
      </Button>
    </Card>
  );
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

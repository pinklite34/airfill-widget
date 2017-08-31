import React from 'react';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
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
      marginRight: '0'
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

const NumberInput = ({ country }) => (
  <Card {...style.container}>
    <Phone
      onChange={() => null}
      className={`${style.phone}`}
      country={country}
      nativeExpanded
    />
    <Button {...style.button}>
      <Check />
    </Button>
  </Card>
);

export default NumberInput;

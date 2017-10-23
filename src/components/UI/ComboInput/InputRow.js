import React from 'react';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';
import flags from '../../flags';

import DefaultFlag from './flag.svg';

const styles = {
  container: css({
    position: 'relative',
    zIndex: 10
  }),

  row: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  }),
  inputContainer: css({
    padding: 12,
    flex: '1 0 auto'
  }),
  input: css({
    width: '100%',
    fontSize: 16,
    border: 0,
    '&:focus': {
      outline: 'none'
    },
    '&::placeholder': {
      color: 'rgba(0,0,0,.26)'
    }
  }),
  flag: css({
    width: 48,
    padding: 12,
    background: '#F0F6FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  })
};

const InputRow = ({
  country,
  getInputProps,
  onChange,
  resetCountry,
  inputRef,
  onFocus,
  onKeyDown
}) => {
  const Flag = country && flags[country.toLowerCase()];

  return (
    <Card {...styles.container}>
      <div {...styles.row}>
        <div {...styles.flag} onClick={resetCountry}>
          {Flag ? <Flag width={24} height={18} /> : <DefaultFlag width={18} height={18} />}
        </div>
        <div {...styles.inputContainer}>
          <input
            {...getInputProps({
              onKeyDown,
              onFocus,
              ref: inputRef,
              type: 'text',
              onChange: e => onChange(e.target.value),
              placeholder: country
                ? 'Enter phone number or provider'
                : 'Enter country or phone number',
              ...styles.input
            })}
          />
        </div>
      </div>
    </Card>
  );
};

export default InputRow;

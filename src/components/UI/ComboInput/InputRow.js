import React from 'react';
import { css } from 'glamor';
import { Button } from 'react-toolbox/lib/button';
import { Card } from 'react-toolbox/lib/card';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import flags from '../../flags';

import Check from '../check.svg';
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
    cursor: 'pointer',
    '& svg': {
      borderRadius: 1,
      boxShadow: '1px 1px 1px rgba(0,0,0,0.08)'
    }
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
  progressBar: css({
    width: '24px !important',
    height: '24px !important'
  })
};

const InputRow = ({
  country,
  getInputProps,
  onChange,
  resetCountry,
  inputRef,
  onFocus,
  onKeyDown,
  loading,
  onSubmit
}) => {
  const Flag = country && flags[country.toLowerCase()];

  return (
    <Card {...styles.container}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div {...styles.row}>
          <div {...styles.flag} onClick={resetCountry}>
            {Flag ? (
              <Flag width={24} height={18} />
            ) : (
              <DefaultFlag width={24} height={18} />
            )}
          </div>
          <div {...styles.inputContainer}>
            <input
              {...getInputProps({
                onKeyDown,
                onFocus,
                onChange: e =>
                  onChange(e.target.value, e.target.selectionStart),
                ref: inputRef,
                type: 'text',
                placeholder: country
                  ? 'Enter phone number or provider'
                  : 'Enter country or phone number',
                ...styles.input
              })}
            />
          </div>
          <Button disabled={loading} {...styles.button} type="submit">
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
      </form>
    </Card>
  );
};

export default InputRow;

import React from 'react';
import { css } from 'glamor';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';

import Flag from '../Flag';
import Check from '../check.svg';

const styles = {
  container: css({
    position: 'relative',
    zIndex: 11
  }),
  row: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  }),
  inputContainer: css({
    padding: 12,
    flex: '1 1 auto'
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
    background: '#F0F6FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
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
  buttonDisabled: css({
    color: '#cccccc !important'
  }),
  progressBar: css({
    width: '24px !important',
    height: '24px !important'
  }),
  check: css({
    fill: '#3E8FE4',
    width: 16,
    height: 16
  }),
  checkDisabled: css({
    fill: 'rgb(204, 204, 204)',
    width: 16,
    height: 16
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
  onSubmit,
  submitEnabled,
  type
}) => (
    <Card {...styles.container}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div {...styles.row}>
          <div {...styles.flag} onClick={resetCountry}>
            <Flag country={country} />
          </div>
          <div {...styles.inputContainer}>
            <input
              {...getInputProps({
                onKeyDown,
                onFocus,
                onChange: e => onChange(e.target.value, e.target.selectionStart),
                ref: inputRef,
                type,
                placeholder: country
                  ? 'Enter phone number or provider'
                  : 'Enter country or phone number',
                ...styles.input
              })}
            />
          </div>
          <Button
            disabled={loading || !submitEnabled}
            {...css([styles.button, !submitEnabled && styles.buttonDisabled])}
            type="submit"
          >
            {loading ? (
              <CircularProgress className={`${styles.progressBar}`} />
            ) : (
                <Check className={`${submitEnabled ? styles.check : styles.checkDisabled}`} />
              )}
          </Button>
        </div>
<<<<<<< Updated upstream
      <div {...styles.inputContainer}>
        <input
          {...getInputProps({
            onFocus,
            onKeyDown,
            onKeyUp: e => onChange(e.target.value, e.target.selectionStart),
            onChange: e => onChange(e.target.value, e.target.selectionStart),
            ref: inputRef,
            type: type,
            placeholder: country
              ? 'Enter phone number or provider'
              : 'Enter country or phone number',
            ...styles.input
          })}
        />
      </div>
      <Button
        disabled={loading || !submitEnabled}
        {...css([styles.button, !submitEnabled && styles.buttonDisabled])}
        type="submit"
      >
        {loading ? (
          <CircularProgress className={`${styles.progressBar}`} />
        ) : (
            <Check
              className={`${
                submitEnabled ? styles.check : styles.checkDisabled
                }`}
            />
          )}
      </Button>
      </div>
    </form >
  </Card >
);
=======
      </form>
    </Card>
  );
>>>>>>> Stashed changes

export default InputRow;

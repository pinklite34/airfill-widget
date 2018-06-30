import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { inputTypeProp, fnProp } from '../../../lib/prop-types';

import Button from '../../UI/Button';
import Card from '../../UI/Card';
import Flag from '../Flag';

import Check from '../check.svg';

const styles = {
  container: css`
    position: relative;
    z-index: 11;
  `,
  row: css`
    display: flex;
    flex-direction: row;
    align-items: stretch;
  `,
  inputContainer: css`
    padding: 12px;
    flex: 1 1 auto;
  `,
  input: css`
    width: 100%;
    font-size: 16px;
    border: 0px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.26);
    }
  `,
  flag: css`
    width: 48px;
    background: #f0f6fa;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  button: css`
    background-color: #f0f6fa !important;
    color: #3e8fe4 !important;
    min-width: 48px !important;
    height: auto !important;
    display: flex !important;

    & svg {
      margin-right: 0 !important;
    }
  `,
  buttonDisabled: css`
    color: #cccccc !important;
  `,
  progressBar: css`
    width: 24px !important;
    height: 24px !important;
  `,
  check: css`
    fill: #3e8fe4;
    width: 16px;
    height: 16px;
  `,
  checkDisabled: css`
    fill: rgb(204, 204, 204);
    width: 16px;
    height: 16px;
  `,
};

export default function InputRow({
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
  countryOnly,
  type,
}) {
  return (
    <Card className={styles.container}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}>
        <div className={styles.row}>
          <div className={styles.flag} onClick={resetCountry}>
            <Flag country={country} />
          </div>
          <div className={styles.inputContainer}>
            <input
              {...getInputProps({
                onFocus,
                onKeyDown,
                onChange: e =>
                  onChange(e.target.value, e.target.selectionStart),
                ref: inputRef,
                type: type,
                placeholder: countryOnly
                  ? 'Enter country'
                  : country
                    ? 'Enter phone number or provider'
                    : 'Enter country or phone number',
                className: styles.input,
              })}
            />
          </div>
          <Button
            disabled={loading || !submitEnabled}
            className={`${styles.button} ${!submitEnabled &&
              styles.buttonDisabled}`}
            type="submit">
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
      </form>
    </Card>
  );
}

InputRow.propTypes = {
  country: PropTypes.string,
  getInputProps: fnProp,
  onChange: fnProp,
  resetCountry: fnProp,
  inputRef: fnProp,
  onFocus: fnProp,
  onKeyDown: fnProp,
  loading: PropTypes.bool,
  onSubmit: fnProp,
  submitEnabled: PropTypes.bool,
  countryOnly: PropTypes.bool,
  type: inputTypeProp,
};

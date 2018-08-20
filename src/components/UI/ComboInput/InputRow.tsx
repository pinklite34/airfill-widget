import * as React from 'react';
import { css } from 'react-emotion';

import Button from '../../UI/Button';
import Card from '../../UI/Card';
import Check from '../check.svg';
import Flag from '../Flag';

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
    min-width: 48px;
    height: auto;
    border-radius: 2px 0 0 2px;
  `,
  button: css`
    min-width: 48px;
    height: auto;
    border-radius: 0 2px 2px 0;
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
        }}
      >
        <div className={styles.row}>
          <Button
            className={styles.flag}
            background="#f0f6fa"
            onClick={resetCountry}
          >
            <Flag country={country} />
          </Button>
          <div className={styles.inputContainer}>
            <input
              {...getInputProps({
                onFocus,
                onKeyDown,
                onChange: e =>
                  onChange(e.target.value, e.target.selectionStart),
                ref: inputRef,
                type,
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
            className={styles.button}
            type="submit"
            background="#f0f6fa"
            loading={loading}
          >
            <Check
              className={`${
                submitEnabled ? styles.check : styles.checkDisabled
              }`}
            />
          </Button>
        </div>
      </form>
    </Card>
  );
}

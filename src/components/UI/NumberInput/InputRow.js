import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { connect } from 'react-redux';

import { default as MuiButton } from 'material-ui/Button';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import Flag from '../Flag';
import Check from '../check.svg';
import { selectCountry } from '../../../store';

const Input = styled('input')`
  width: 100%;
  font-size: 16px;
  border: 0;
  &:focus {
    outline: none;
  }
  &::placeholder: {
    color: rgba(0, 0, 0, 0.26);
  }
`;

const Container = styled('div')`
  position: relative;
  z-index: 11;

  background-color: white;
  border-radius: 2px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

const InputContainer = styled('div')`
  padding: 12px;
  flex: 1 1 auto;
`;

const FlagContainer = styled('div')`
  width: 48px;
  background: #f0f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Button = styled(MuiButton)`
  background-color: #f0f6fa !important;
  color: ${props => (props.disabled ? '#cccccc' : '#3e8fe4')} !important;
  min-width: 48px !important;
  height: auto !important;
  display: flex !important;
  & svg {
    margin-right: 0;
  }
`;

const Row = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const styles = {
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

function InputRow({
  onChange,
  country,
  loading,
  submitEnabled,
  onSubmit,
  setOpen,
  value,
}) {
  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}>
        <Row>
          <FlagContainer
            onClick={() => {
              onChange('');
              setOpen(true);
            }}>
            <Flag country={country && country.alpha2} />
          </FlagContainer>
          <InputContainer onClick={() => setOpen(true)}>
            <Input onChange={e => onChange(e.target.value)} value={value} />
          </InputContainer>
          <Button disabled={loading || !submitEnabled} type="submit">
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
        </Row>
      </form>
    </Container>
  );
}

InputRow.propTypes = {
  onChange: PropTypes.any,
  country: PropTypes.any,
  loading: PropTypes.any,
  submitEnabled: PropTypes.any,
  onSubmit: PropTypes.any,
  setOpen: PropTypes.any,
  value: PropTypes.string.isRequired,
};

export default connect(state => ({
  country: selectCountry(state),
}))(InputRow);

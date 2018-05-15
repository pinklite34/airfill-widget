import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { selectNumber, selectIsNumberLookup } from '../../store';
import { openComboInput, setComboInputFocus, setNumber } from '../../actions';
import { historyProp, fnProp, numberProp } from '../../lib/prop-types';

import Phone from '../UI/phone.svg';
import Collapsed from '../UI/Collapsed';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 350,
  }),
  icon: css({
    width: 24,
    height: 24,
    marginRight: 30,
    marginLeft: 14,
    fill: '#3e8fe4',
    flex: '0 0 auto',
    '@media(max-width: 460px)': {
      marginRight: 14,
      marginLeft: 0,
    },
  }),
  text: css({
    fontWeight: 500,
  }),
};

function NumberLookupCollapsed({
  number,
  isNumberLookup,
  openComboInput,
  setNumber,
  setComboInputFocus,
  history,
}) {
  const changeNumber = () => {
    setNumber('');
    setComboInputFocus(true);
    openComboInput();
    history.push('/refill');
  };

  return isNumberLookup ? (
    <Collapsed onClick={changeNumber} type="number">
      <div {...styles.container}>
        <Phone {...styles.icon} />
        <div {...styles.text}>{number}</div>
      </div>
    </Collapsed>
  ) : null;
}

NumberLookupCollapsed.propTypes = {
  number: numberProp,
  isNumberLookup: PropTypes.bool,
  openComboInput: fnProp,
  setNumber: fnProp,
  setComboInputFocus: fnProp,
  history: historyProp,
};

export default connect(
  state => ({
    number: selectNumber(state),
    isNumberLookup: selectIsNumberLookup(state),
  }),
  {
    openComboInput,
    setComboInputFocus,
    setNumber,
  }
)(NumberLookupCollapsed);

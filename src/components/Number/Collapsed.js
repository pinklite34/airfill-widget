import React from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { selectNumber, selectIsNumberLookup } from '../../store';
import { openComboInput, setComboInputFocus, setNumber } from '../../actions';

import Phone from '../UI/phone.svg';
import CollapsedSection from '../UI/CollapsedSection';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 350
  }),
  icon: css({
    width: 24,
    height: 24,
    margin: '-3px 0',
    fill: '#3e8fe4',
    marginRight: 12,
    flex: '0 0 auto'
  }),
  text: css({
    fontWeight: 500
  })
};

const Collapsed = ({
  darken,
  number,
  isNumberLookup,
  openComboInput,
  setNumber,
  setComboInputFocus,
  history
}) => {
  if (!isNumberLookup) {
    return null;
  }

  const changeNumber = () => {
    setNumber('');
    setComboInputFocus(true);
    openComboInput();
    history.push('/refill');
  };

  return (
    <CollapsedSection darken={darken} onClick={changeNumber} type="number">
      <div {...styles.container}>
        <Phone {...styles.icon} />
        <div {...styles.text}>{number}</div>
      </div>
    </CollapsedSection>
  );
};

export default connect(
  state => ({
    number: selectNumber(state),
    isNumberLookup: selectIsNumberLookup(state)
  }),
  {
    openComboInput,
    setComboInputFocus,
    setNumber
  }
)(Collapsed);

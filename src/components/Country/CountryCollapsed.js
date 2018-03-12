import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { openComboInput, setComboInputFocus, setCountry } from '../../actions';
import { selectCountry, selectIsNumberLookup } from '../../store';
import {
  historyProp,
  countryProp,
  darkenProp,
  fnProp,
} from '../../lib/prop-types';

import Collapsed from '../UI/Collapsed';
import Flag from '../UI/Flag';

const styles = {
  container: css({
    position: 'relative',
    width: '100%',
    maxWidth: 350,
  }),
  country: css({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 9,
  }),
  flag: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: 26,
      height: 18,
      borderRadius: 1,
      boxShadow: '1px 1px 1px rgba(0,0,0,0.08)',
    },
    marginRight: 30,
    marginLeft: 14,
    '@media(max-width: 460px)': {
      marginRight: 14,
      marginLeft: 0,
    },
  }),
};

function CountryCollapsed({
  home,
  country,
  darken,
  isNumberLookup,
  openComboInput,
  setComboInputFocus,
  setCountry,
  history,
}) {
  const openMenu = () => {
    setCountry('');
    openComboInput();
    setComboInputFocus(true);
    !home && history.push('/refill');
  };

  return isNumberLookup ? null : country && country.alpha2 ? (
    <Collapsed darken={darken} onClick={openMenu} type="country">
      <div {...styles.container}>
        <div {...styles.country} onClick={openMenu}>
          <div {...styles.flag}>
            <Flag country={country.alpha2} />
          </div>
          {country.name}
        </div>
      </div>
    </Collapsed>
  ) : (
    <Collapsed hideButton darken={darken} type="country">
      {'Select a country above to see available services.'}
    </Collapsed>
  );
}

CountryCollapsed.propTypes = {
  home: PropTypes.bool,
  country: countryProp,
  darken: darkenProp,
  isNumberLookup: PropTypes.bool,
  openComboInput: fnProp,
  setComboInputFocus: fnProp,
  setCountry: fnProp,
  history: historyProp,
};

export default connect(
  state => ({
    country: selectCountry(state),
    isNumberLookup: selectIsNumberLookup(state),
  }),
  {
    openComboInput,
    setComboInputFocus,
    setCountry,
  }
)(CountryCollapsed);

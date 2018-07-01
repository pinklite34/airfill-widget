import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { connect } from 'react-redux';

import { openComboInput, setComboInputFocus, setCountry } from '../../actions';
import { selectCountry, selectIsNumberLookup } from '../../store';
import { historyProp, countryProp, fnProp } from '../../lib/prop-types';

import Collapsed from '../UI/Collapsed';
import Flag from '../UI/Flag';
import Text from '../UI/Text';

const styles = {
  container: css`
    position: relative;
    width: 100%;
    max-width: 350px;
  `,
  country: css`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 9;
  `,
  flag: css`
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      width: 26px;
      height: 18px;
      border-radius: 1px;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.08);
    }
    margin-right: 30px;
    margin-left: 14px;

    @media (max-width: 460px) {
      margin-right: 14px;
      margin-left: 0px;
    }
  `,
};

function CountryCollapsed({
  home,
  country,
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

  return country && country.alpha2 ? (
    <Collapsed onClick={openMenu} type="country">
      <div className={styles.container}>
        <div className={styles.country} onClick={openMenu}>
          <div className={styles.flag}>
            <Flag country={country.alpha2} />
          </div>
          {country.name}
        </div>
      </div>
    </Collapsed>
  ) : (
    <Collapsed hideButton type="country">
      <Text type="p" size="16px" id="widget.introduction.select">
        Select a country above to see available services.
      </Text>
    </Collapsed>
  );
}

CountryCollapsed.propTypes = {
  home: PropTypes.bool,
  country: countryProp,
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

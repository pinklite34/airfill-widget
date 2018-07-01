import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { connect } from 'react-redux';

import { setCountry } from '../../actions';
import { selectCountryCode, selectCountryList } from '../../store';
import { countriesProp, fnProp } from '../../lib/prop-types';

const styles = {
  select: css`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 999;
  `,
};

function SelectCountry({ countries, selected, setCountry, onChange }) {
  return (
    <select
      className={styles.select}
      value={selected}
      ref={n => (this.select = n)}
      onChange={event => {
        setCountry(event.target.value);
        onChange && onChange(event.target.value);
      }}>
      {countries.map(country => (
        <option value={country.alpha2} key={country.alpha2}>
          {country.name}
        </option>
      ))}
    </select>
  );
}

SelectCountry.propTypes = {
  countries: countriesProp,
  selected: PropTypes.bool,
  setCountry: fnProp,
  onChange: fnProp,
};

export default connect(
  state => ({
    countries: selectCountryList(state),
    selected: selectCountryCode(state),
  }),
  {
    setCountry,
  }
)(SelectCountry);

import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { setCountry } from '../../actions';
import { selectCountryCode, selectCountryList } from '../../store';

const styles = {
  select: css({
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 999
  })
};

class SelectCountry extends Component {
  render() {
    const { countries, selected, setCountry } = this.props;
    return (
      <select
        {...styles.select}
        value={selected}
        ref={n => (this.select = n)}
        onChange={event => setCountry(event.target.value)}
      >
        {countries.map(country => (
          <option value={country.alpha2} key={country.alpha2}>
            {country.name}
          </option>
        ))}
      </select>
    );
  }
}

export default connect(
  state => ({
    countries: selectCountryList(state),
    selected: selectCountryCode(state)
  }),
  {
    setCountry
  }
)(SelectCountry);

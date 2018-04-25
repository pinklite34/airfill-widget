import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { countryProp } from '../../lib/prop-types';

import { selectCountry } from '../../store';
import { setCountry } from '../../actions';

const CurrentCountry = ({ children, country, setCountry }) =>
  children({ country, setCountry });

CurrentCountry.propTypes = {
  children: PropTypes.func.isRequired,
  country: countryProp.isRequired,
};

export default connect(
  state => ({
    country: selectCountry(state),
  }),
  {
    setCountry,
  }
)(CurrentCountry);

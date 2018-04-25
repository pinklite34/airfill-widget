import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { countryProp } from '../../lib/prop-types';

import { selectCountry } from '../../store';
import { setCountry } from '../../actions';

const Country = ({ children, country, setCountry }) =>
  children({ country, setCountry });

Country.propTypes = {
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
)(Country);

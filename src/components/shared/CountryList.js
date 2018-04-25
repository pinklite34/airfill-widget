import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { countryProp } from '../../lib/prop-types';

import { selectCountryList } from '../../store';

const CountryList = ({ children, countryList }) => children(countryList);

CountryList.propTypes = {
  children: PropTypes.func.isRequired,
  countryList: PropTypes.arrayOf(countryProp).isRequired,
};

export default connect(state => ({
  countryList: selectCountryList(state),
}))(CountryList);

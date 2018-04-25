import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { numberProp } from '../../lib/prop-types';

import { selectNumber, selectRecentNumbers } from '../../store';
import { setNumber } from '../../actions';

const PhoneNumber = ({ children, recentNumbers, number, setNumber }) =>
  children({ number, recentNumbers, setNumber });

PhoneNumber.propTypes = {
  children: PropTypes.func.isRequired,
  number: numberProp.isRequired,
  recentNumbers: PropTypes.arrayOf(numberProp).isRequired,
  setNumber: PropTypes.func.isRequired,
};

PhoneNumber.defaultProps = {
  recentNumbers: [],
};

export default connect(
  state => ({
    number: selectNumber(state),
    recentNumbers: selectRecentNumbers(state),
  }),
  {
    setNumber,
  }
)(PhoneNumber);

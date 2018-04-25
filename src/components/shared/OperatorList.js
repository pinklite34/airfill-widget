import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectAvailableOperators } from '../../store';
import { setOperator } from '../../actions';

const OperatorList = ({ children, operators, setOperator }) =>
  children({
    operators: Object.keys(operators).reduce(
      (acc, val) => acc.concat(operators[val]),
      []
    ),
    setOperator,
  });

OperatorList.propTypes = {
  children: PropTypes.func.isRequired,
  operators: PropTypes.object.isRequired,
  setOperator: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    operators: selectAvailableOperators(state),
  }),
  {
    setOperator,
  }
)(OperatorList);

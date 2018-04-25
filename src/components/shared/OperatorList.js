import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectAvailableOperators } from '../../store';
import { setOperator } from '../../actions';

const OperatorList = ({ children, filter, operators, setOperator }) =>
  children({
    operators: Object.keys(operators)
      .filter(key => {
        if (typeof filter === 'string') {
          filter = [filter];
        }

        return !filter || filter.indexOf(key) > -1;
      })
      .reduce((acc, type) => acc.concat(operators[type]), []),
    setOperator,
  });

OperatorList.propTypes = {
  children: PropTypes.func.isRequired,
  operators: PropTypes.object.isRequired,
  setOperator: PropTypes.func.isRequired,
  filter: PropTypes.oneOf(
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ),
};

export default connect(
  state => ({
    operators: selectAvailableOperators(state),
  }),
  {
    setOperator,
  }
)(OperatorList);

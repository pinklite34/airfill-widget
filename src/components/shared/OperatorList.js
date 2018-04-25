import { connect } from 'react-redux';

import { selectAvailableOperators } from '../../store';

const OperatorList = ({ children, operators }) =>
  Object.keys(operators).map(type =>
    operators[type].map(operator => children({ operator }))
  );

export default connect(state => ({
  operators: selectAvailableOperators(state),
}))(OperatorList);

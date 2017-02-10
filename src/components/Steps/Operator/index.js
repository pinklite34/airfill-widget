import React, {Component} from 'react';
import {connect} from 'react-redux';

import Step from '../Step';
import Field from '../Field';
import Button from '../../UI/Button';
import Select from '../../UI/Select';

import {setOperator} from '../../../actions';
import {selectAvailableOperators, selectSelectedOperator} from '../../../store';
import './index.scss';

const scaledLogo = url =>
  url && url.replace('/d_operator.png/', /d_operator.png,w_120,h_90,c_pad/)

class OperatorStep extends Component {
  handleOperatorClick = (event) => {
    this.props.setOperator(event.target.value)
    this.props.onContinue()
  }

  render () {
    const {
      step,
      expanded,
      onBack,
      showSummary,
      operators,
      selectedOperator
    } = this.props;

    const stepProps = {
      step,
      title: 'Select Operator or Service',
      showSummary,
      expanded,
      onBack
    };

    if (expanded) {
      return (
        <Step {...stepProps}>
          {Object.keys(operators).map(type =>
            <Field
              label={`${type}`}
              key={type}
              className="operator-group"
            >{
              operators[type].map(({name, slug, logoImage}) =>
                <button key={slug} value={slug} onClick={this.handleOperatorClick} className="operator-button">
                  <span><img src={scaledLogo(logoImage)} /></span>
                  <strong>Refill {name}</strong>
                </button>
              )
            }</Field>
          )}
        </Step>
      );

    } else if (showSummary) {
      return (
        <Step {...stepProps}><strong>{selectedOperator && selectedOperator.name}</strong></Step>
      );
    }

    return <Step {...stepProps} />;
  }
}

export default connect((state) => ({
  operators: selectAvailableOperators(state),
  selectedOperator: selectSelectedOperator(state)
}), {
  setOperator
})(OperatorStep);

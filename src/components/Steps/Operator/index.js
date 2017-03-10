import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import Step from '../Step';
import Field from '../../UI/Field';
import Button from '../../UI/Button';
import PhoneNumberInput from '../../UI/PhoneNumberInput';

import {setOperator, lookupNumber, setNumber} from '../../../actions';
import {selectCountry, selectNumber, selectAvailableOperators, selectSelectedOperator, selectOperator} from '../../../store';
import './index.scss';

const MiniButton = styled(Button)`
  padding: 0 8px;
  min-height: 28px;
  margin: -12px -4px 0;
`

const scaledLogo = url =>
  url && url.replace('/d_operator.png/', /d_operator.png,w_120,h_90,c_pad/)

class OperatorStep extends Component {
  state = { showAutoDetect: false }

  handleOperatorClick = (event) => {
    this.props.setOperator(event.target.value)
    this.props.onContinue()
  }

  handleAutoDetect = () => {
    this.props.lookupNumber(this.props.number).then(() => this.props.onContinue())
  }
  toggleAutoDetect = () => {
    this.setState(prev => ({...prev, showAutoDetect: !prev.showAutoDetect}))
  }

  renderToggle() {
    return (<MiniButton onClick={this.toggleAutoDetect}>
      { this.state.showAutoDetect ? 'Pick operator' : 'Auto detect operator' }
    </MiniButton>)
  }

  renderPhoneAutoDetectForm() {
    const {country, number, numberLookup} = this.props;

    return <PhoneNumberInput
      label={'Auto Detect Mobile Operator'}
      className="operator-group"
      country={country}
      onChange={this.props.setNumber}
      defaultValue={number}
      error={numberLookup.error}
    >
      <Button type="button" disabled={!number} loading={numberLookup.isLoading} onClick={this.handleAutoDetect}>
        Continue
      </Button>
    </PhoneNumberInput>
  }

  renderOperatorGroup(type, operators) {
    return <Field
      label={`${type}`}
      key={type}
      className="operator-group"
    >{
      operators.map(({name, slug, logoImage}) =>
        <button key={slug} value={slug} onClick={this.handleOperatorClick} className="operator-button">
          <span><img src={scaledLogo(logoImage)} /></span>
          <strong>Refill {name}</strong>
        </button>
      )
    }</Field>
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
        <Step {...stepProps} subTitle={this.renderToggle()}>
          {this.state.showAutoDetect ?
            this.renderPhoneAutoDetectForm() :
            Object.keys(operators).map(type =>
              this.renderOperatorGroup(type, operators[type])
            )
          }
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
  country: selectCountry(state),
  number: selectNumber(state),
  operators: selectAvailableOperators(state),
  selectedOperator: selectSelectedOperator(state) || selectOperator(state).result,
  numberLookup: selectOperator(state)
}), {
  setOperator,
  setNumber,
  lookupNumber
})(OperatorStep);

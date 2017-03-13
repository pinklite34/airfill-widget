import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import Step from '../Step';
import Field from '../../UI/Field';
import Button from '../../UI/Button';
import PhoneNumberInput from '../../UI/PhoneNumberInput';

import {setOperator, lookupNumber, setNumber} from '../../../actions';
import {selectCountry, selectNumber, selectAvailableOperators, selectSelectedOperator, selectOperator} from '../../../store';

const MiniButton = styled(Button)`
  padding: 0 12px;
  min-height: 28px;
  margin: -12px -4px 0;
`

const OperatorGroup = styled(Field)`
  .refill-field-label {
    clear: both;
    overflow: hidden;
  }
  .refill-field {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -8px 0 -4px;
  }
`

const OperatorButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 4px;

  border: 1px solid #aaa;
  background: #f0f0f0 linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.03));
  border-radius: 4px;
  padding: 8px;
  transition: all 250ms;
  box-shadow: 0 0 0 1px transparent;
  opacity: 0.8;
  flex: 1 100 136px;
  max-width: 156px;

  font-size: 12px;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.08);

  color: #090909;
  outline: none;

  &:hover, &:focus {
    cursor: pointer;
    background-color: #fff;
    opacity: 1;
  }
  &:active {
    border-color: #B0CB0B;
    background-color: #fff;
    box-shadow: 0 0 0 2px #B0CB0B, inset 0 0 2px #fff, 0 1px 16px rgba(0,0,0,0.2);
    opacity: 1;
  }

  > * {
    pointer-events: none;
  }

  img {
    display: block;
    height: 90px;
    margin: 0 0 8px;
  }
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
      <Button disabled={!number} loading={numberLookup.isLoading} onClick={this.handleAutoDetect}>
        Continue
      </Button>
    </PhoneNumberInput>
  }

  renderOperatorGroup(type, operators) {
    return <OperatorGroup
      label={`${type}`}
      key={type}
    >{
      operators.map(({name, slug, logoImage}) =>
        <OperatorButton type="button" key={slug} value={slug} onClick={this.handleOperatorClick}>
          <span><img src={scaledLogo(logoImage)} /></span>
          <strong>Refill {name}</strong>
        </OperatorButton>
      )
    }</OperatorGroup>
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

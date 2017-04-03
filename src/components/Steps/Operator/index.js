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

  @media(max-width: 480px) {
    margin: -9px -4px 0;
  }
`

const OperatorGroup = styled(Field)`
  margin: 0 -8px 0 -4px;

  .refill-field-label {
    clear: both;
    overflow: hidden;
  }
  .refill-field {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media(max-width: 480px) {
    margin: 0 -12px 12px;
    border-bottom: 1px solid #ccc;

    &:last-child {
      margin-bottom: -12px;
      border-bottom: none;
    }

    .refill-field {
      flex-direction: column;
      flex-wrap: none;
    }
    .refill-field-label {
      padding: 8px 12px 0;
    }
  }
`

const OperatorButton = styled.a`
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
    height: 44px;
    margin: 0 auto 8px;
  }

  @media(max-width: 480px) {
    margin:  0;
    max-width: 100%;
    border-radius: 0;
    border: none;
    border-top: 1px solid #ccc;
    background: #fff;

    flex-direction: row;
    justify-content: flex-start;
    flex: 1 0 50px;

    img {
      width: 40px;
      height: auto;
      margin: 0 8px 0 0;
    }

    strong {
      flex: 1;
      text-align: left;
    }
    &:after {
      content: '';
      display: block;
      width: 14px;
      height: 14px;
      margin: 0 4px;
      transform: rotate(-45deg);
      border-style: solid;
      border-width: 0 2px 2px 0;
      border-color: #333;
    }

    &:active {
      border-color: #ccc;
      background-color: #fff;
      box-shadow: none;
      opacity: 1;
    }
  }
`

const scaledLogo = url =>
  url && url.replace('/d_operator.png/', /d_operator.png,w_120,h_90,c_pad/)

class OperatorStep extends Component {
  state = { showAutoDetect: false }

  handleAutoDetect = () => {
    this.props.lookupNumber(this.props.number).then(() => this.props.onContinue())
  }
  toggleAutoDetect = () => {
    this.setState(prev => ({...prev, showAutoDetect: !prev.showAutoDetect}))
  }

  handleOperatorClick(slug) {
    this.props.setOperator(slug)
    this.props.onContinue()
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
        <OperatorButton key={slug} onClick={() => this.handleOperatorClick(slug)}>
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

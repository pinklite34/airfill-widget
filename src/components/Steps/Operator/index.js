import React, {Component} from 'react';
import {connect} from 'react-redux';

import Step from '../Step';
import Field from '../Field';
import Button from '../../UI/Button';
import Select from '../../UI/Select';

import {setOperator, lookupNumber, setNumber} from '../../../actions';
import {selectCountry, selectNumber, selectAvailableOperators, selectSelectedOperator, selectOperator} from '../../../store';
import './index.scss';
import Cleave from 'cleave.js/dist/cleave-react';
import 'cleave.js/dist/addons/cleave-phone.i18n';
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
  handleNumberChange = event => {
    this.props.setNumber(event.target.value)
  }
  toggleAutoDetect = () => {
    this.setState(prev => ({...prev, showAutoDetect: !prev.showAutoDetect}))
  }

  renderToggle() {
    return (<Button onClick={this.toggleAutoDetect}>
      { this.state.showAutoDetect ? 'Pick operator' : 'Auto detect operator' }
    </Button>)
  }

  renderPhoneAutoDetectForm() {
    const {country, number, numberLookup} = this.props;

    return <Field
      label={'Auto Detect Mobile Operator'}
      className="operator-group"
    >
      <Cleave
        options={{phone: true, phoneRegionCode: country.alpha2}}
        onChange={this.handleNumberChange}
        value={number || (number == null ? country.countryCallingCodes[0] : '')}
        placeholder={country.countryCallingCodes[0]}
        type="tel"
        size="40"
      />
      <Button type="button" disabled={!number} loading={numberLookup.isLoading} onClick={this.handleAutoDetect}>
        Continue
      </Button>
    </Field>
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
  selectedOperator: selectSelectedOperator(state),
  numberLookup: selectOperator(state)
}), {
  setOperator,
  setNumber,
  lookupNumber
})(OperatorStep);

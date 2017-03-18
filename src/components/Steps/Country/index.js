import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import Step from '../Step';
import Field from '../../UI/Field';
import Button from '../../UI/Button';
import Select from '../../UI/Select';

import {setCountry} from '../../../actions';
import {selectCountryList, selectCountry} from '../../../store';

const CountryField = styled(Field)`
  .refill-field {
    display: flex;
    flex-direction: row;
  }
`

class CountryStep extends Component {
  handleCountryChange = (event) => this.props.setCountry(event.target.value)

  render () {
    const {
      expanded,
      onContinue,
      onBack,
      showSummary,
      selectedCountry,
      step
    } = this.props;

    const stepProps = {
      step,
      title: 'Select Country',
      showSummary,
      expanded,
      onBack
    };

    if (expanded) {
      return (
        <Step {...stepProps} onSubmit={() => selectedCountry && onContinue()}>
          <CountryField
            hint="Select the country you want to send a refill to"
          >
            <Select value={selectedCountry && selectedCountry.alpha2 || ''} onChange={this.handleCountryChange}>
              <option disabled>Select a country</option>
              {this.props.countries.map(({name, alpha2}) =>
                <option key={alpha2} value={alpha2}>{name}</option>
              )}
            </Select>
            <Button type="submit" disabled={!selectedCountry}>
              Continue
            </Button>
          </CountryField>
        </Step>
      );

    } else if (showSummary) {
      return (
        <Step {...stepProps}><strong>{selectedCountry && selectedCountry.name}</strong></Step>
      );
    }

    return <Step {...stepProps} />;
  }
}

export default connect((state) => ({
  countries: selectCountryList(state),
  selectedCountry: selectCountry(state)
}), {
  setCountry
})(CountryStep);

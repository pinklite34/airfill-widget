import React from 'react';
import { connect } from 'react-redux';
import { selectCountry } from '../../store';
import CollapsedSection from '../UI/CollapsedSection';

const Collapsed = ({ country, prefix }) => {
  if (country) {
    return (
      <CollapsedSection onClick={() => null} type="country">
        {prefix} <strong>{country.name}</strong>
      </CollapsedSection>
    );
  } else {
    return null;
  }
};

export default connect(state => ({
  country: selectCountry(state)
}))(Collapsed);

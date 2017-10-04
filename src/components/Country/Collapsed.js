import React from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { selectCountry } from '../../store';
import CollapsedSection from '../UI/CollapsedSection';
import SelectCountry from '../UI/SelectCountry';

const styles = {
  strong: css({
    position: 'relative'
  }),
  button: css({
    position: 'relative'
  })
};

const Collapsed = ({ country, prefix, darken }) => {
  if (country) {
    return (
      <CollapsedSection hideButton darken={darken}>
        {prefix} <strong {...styles.strong}>
          <SelectCountry />
          {country.name}
        </strong>
      </CollapsedSection>
    );
  } else {
    return null;
  }
};

export default connect(state => ({
  country: selectCountry(state)
}))(Collapsed);

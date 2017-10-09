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

const Collapsed = ({ home, country, prefix, darken, history }) => {
  if (country) {
    return (
      <CollapsedSection hideButton darken={darken}>
        {home && 'Services in'} <strong {...styles.strong}>
          <SelectCountry
            onChange={() => !home && history.push('/selectProvider')}
          />
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

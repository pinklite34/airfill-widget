import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { selectCountryList } from '../../../store';
import Row from './Row';

const styles = {
  icon: css({
    maxWidth: 24,
    maxHeight: 18,
    display: 'block',
  }),
};

const HistoryRow = ({ item, countryList, ...props }) => {
  const country = countryList.find(c => !!c.operators[item.operator]);

  if (country) {
    const operator = country.operators[item.operator];

    return (
      <Row
        {...props}
        icon={
          <img src={operator.logoImage} alt={operator.name} {...styles.icon} />
        }
        content={
          <span>
            {operator.name} <strong>{item.number}</strong>
          </span>
        }
      />
    );
  } else {
    return null;
  }
};

export default connect(state => ({
  countryList: selectCountryList(state),
}))(HistoryRow);

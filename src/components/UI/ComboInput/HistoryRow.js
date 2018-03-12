import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { selectCountryList } from '../../../store';
import Row from './Row';
import { operatorProp, countriesProp, rowProps } from '../../../lib/prop-types';

const styles = {
  icon: css({
    maxWidth: 24,
    maxHeight: 18,
    display: 'block',
  }),
};

function HistoryRow({ item, countryList, ...props }) {
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
            {operator.name}
            <br />
            <strong>{item.number}</strong>
          </span>
        }
      />
    );
  } else {
    return null;
  }
}

HistoryRow.propTypes = {
  item: operatorProp,
  countryList: countriesProp,
  ...rowProps,
};

export default connect(state => ({
  countryList: selectCountryList(state),
}))(HistoryRow);

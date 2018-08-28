import * as React from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';

import { CountryProp } from '../../../types';

import { selectCountryList } from '../../../store';

import Row from './Row';

const styles = {
  icon: css`
    max-width: 24px;
    max-height: 18px;
    display: block;
  `,
};

interface HistoryRowProps {
  item: any;
  countryList: CountryProp[];
}

function HistoryRow({ item, countryList, ...props }: HistoryRowProps) {
  const country = countryList.find(c => !!c.operators[item.operator]);

  if (country) {
    const operator = country.operators[item.operator];

    const hasNumber = !operator.isPinBased;

    return (
      <Row
        {...props}
        icon={
          <img
            src={operator.logoImage}
            alt={operator.name}
            className={styles.icon}
          />
        }
        content={
          <span>
            {operator.name}
            {hasNumber && <br />}
            <strong>{hasNumber && item.number}</strong>
          </span>
        }
      />
    );
  } else {
    return null;
  }
}

export default connect(state => ({
  countryList: selectCountryList(state),
}))(HistoryRow);

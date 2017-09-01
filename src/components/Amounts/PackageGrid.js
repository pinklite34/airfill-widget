import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { selectOperator } from '../../store';

import ActiveSection from '../UI/ActiveSection';
import Package from './Package';

const styles = {
  grid: css({
    display: 'flex',
    flexWrap: 'wrap',
    margin: -6
  })
};

const PackageGrid = ({ operator }) => (
  <ActiveSection>
    <div {...styles.grid}>
      {operator.result.packages.map((pkg, i) => (
        <Package
          key={i}
          name={`${pkg.value} ${operator.result.currency}`}
          btcPrice={pkg.btcPrice}
        />
      ))}
    </div>
  </ActiveSection>
);

export default connect(state => ({
  operator: selectOperator(state)
}))(PackageGrid);

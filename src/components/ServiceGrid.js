import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { selectCountry } from '../store';

import Service from './Service';

const styles = {
  container: css({
    backgroundColor: '#FAFAFA',
    padding: 16
  }),
  grid: css({
    display: 'flex',
    flexWrap: 'wrap',
    margin: -6
  })
};

class ServiceGrid extends Component {
  constructor() {
    super();

    this.state = {
      showAll: false
    };
  }

  showAll = () => this.setState({ showAll: true });

  render() {
    const { country } = this.props;

    if (!country) {
      return (
        <div {...styles.container}>
          Your country is not yet supported in Bitrefill.
        </div>
      );
    }

    const operators = Object.keys(country.operators);

    const { showAll } = this.state;
    const visibleOperators = showAll ? operators : operators.slice(0, 4);

    return (
      <div {...styles.container}>
        <div {...styles.grid}>
          {visibleOperators.map(operator => (
            <Service key={operator} data={country.operators[operator]} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  country: selectCountry(state)
}))(ServiceGrid);

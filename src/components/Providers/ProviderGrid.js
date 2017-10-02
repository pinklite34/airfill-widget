import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { setOperator } from '../../actions';
import { selectCountry } from '../../store';

import ActiveSection from '../UI/ActiveSection';
import Provider, { ShowAll } from './Provider';

const styles = {
  grid: css({
    display: 'flex',
    flexWrap: 'wrap',
    margin: -6
  })
};

class ProviderGrid extends Component {
  constructor() {
    super();

    this.state = {
      showAll: false
    };
  }

  showAll = () => this.setState({ showAll: true });

  selectOperator = slug =>
    this.props
      .setOperator(slug)
      .then(() => this.props.history.push('/selectAmount'));

  render() {
    const { country } = this.props;

    if (!country) {
      return (
        <ActiveSection>
          Your country is not yet supported in Bitrefill.
        </ActiveSection>
      );
    }

    const operators = Object.keys(country.operators);

    const { showAll } = this.state;
    const visibleOperators =
      showAll || operators.length <= 5 ? operators : operators.slice(0, 4);

    return (
      <ActiveSection title="Select provider">
        <div {...styles.grid}>
          {visibleOperators.map(operator => (
            <Provider
              key={operator}
              data={country.operators[operator]}
              onSelect={() =>
                this.selectOperator(country.operators[operator].slug)}
            />
          ))}
          {operators.length > visibleOperators.length && (
            <ShowAll onClick={this.showAll} count={operators.length} />
          )}
        </div>
      </ActiveSection>
    );
  }
}

export default connect(
  state => ({
    country: selectCountry(state)
  }),
  {
    setOperator
  }
)(ProviderGrid);

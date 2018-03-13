import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import SectionTitle from '../UI/SectionTitle';
import Provider, { ShowAll } from './Provider';
import { providersProp, fnProp } from '../../lib/prop-types';

const styles = {
  container: css({
    '& + &': {
      marginTop: 20,
    },
  }),
  grid: css({
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  }),
};

export default class ProviderGrid extends PureComponent {
  static propTypes = {
    defaultShowAll: PropTypes.bool,
    providers: providersProp,
    title: PropTypes.node,
    onSelect: fnProp,
  };

  state = {
    showAll: this.props.defaultShowAll || false,
  };

  showAll = () => this.setState({ showAll: true });

  render() {
    const { providers, title, onSelect } = this.props;

    const { showAll } = this.state;

    const visibleProviders =
      showAll || providers.length <= 5 ? providers : providers.slice(0, 4);

    return (
      <div {...styles.container}>
        <SectionTitle>{title}</SectionTitle>
        <div {...styles.grid}>
          {visibleProviders.map(provider => (
            <Provider
              key={provider.slug}
              data={provider}
              onSelect={() => onSelect(provider.slug)}
            />
          ))}
          {providers.length > visibleProviders.length && (
            <ShowAll onClick={this.showAll} count={providers.length} />
          )}
        </div>
      </div>
    );
  }
}
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

import SectionTitle from '../UI/SectionTitle';
import Provider, { ShowAll } from './Provider';
import { providersProp, fnProp } from '../../lib/prop-types';

const styles = {
  container: css`
    & + & {
      margin-top: 20px;
    }
  `,
  grid: css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  `,
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
      <div className={styles.container}>
        <SectionTitle>{title}</SectionTitle>
        <div className={styles.grid}>
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

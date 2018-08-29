import * as React from 'react';
import { css } from 'react-emotion';

import { ProviderObject, TransProp } from '../../types';
import SectionTitle from '../UI/SectionTitle';
import Provider, { ShowAll } from './Provider';

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

interface ProvidersGridProps {
  defaultShowAll?: boolean;
  providers: ProviderObject[];
  title: TransProp;
  onSelect: (slug: string) => void;
}

export default class ProviderGrid extends React.PureComponent<
  ProvidersGridProps
> {
  state = {
    showAll: this.props.defaultShowAll || false,
  };

  showAll = () => this.setState({ showAll: true });

  render() {
    const { providers, title, onSelect } = this.props;

    const { showAll } = this.state;

    const visibleProviders =
      showAll || providers.length <= 4 ? providers : providers.slice(0, 3);

    return (
      <div className={styles.container}>
        <SectionTitle text={title} />
        <div className={styles.grid}>
          {visibleProviders.map(provider => (
            <Provider
              key={provider.slug}
              provider={provider}
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

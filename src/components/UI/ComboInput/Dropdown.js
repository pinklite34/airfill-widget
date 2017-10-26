import React from 'react';
import VirtualList from 'react-tiny-virtual-list';

import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';

import CountryRow from './CountryRow';
import ProviderRow from './ProviderRow';

const styles = {
  container: css({
    position: 'absolute',
    zIndex: 9,
    width: '100%',
    marginTop: -4,
    textAlign: 'left'
  }),
  containerCard: css({
    borderRadius: '0 0 4px 4px !important',
    paddingTop: 4
  }),
  content: css({
    maxHeight: 250,
    overflow: 'scroll !important'
  }),
  sectionTitle: css({
    padding: 12,
    fontWeight: 700,
    marginLeft: 32
  })
};

const rowComponents = {
  country: CountryRow,
  provider: ProviderRow
};

const Dropdown = ({
  getItemProps,
  items,
  highlightedIndex
}) => (
  <div {...styles.container}>
    <Card {...styles.containerCard}>
      <div {...styles.content}>
        <VirtualList
          width="100%"
          height={items.length < 6 ? items.length * 44 : 240}
          scrollToAlignment="auto"
          scrollToIndex={highlightedIndex || 0}
          itemSize={44}
          itemCount={items.length}
          renderItem={({ index, style }) => {
            const item = items[index];
            const Row =
              item.__type && rowComponents[item.__type]
                ? rowComponents[item.__type]
                : rowComponents.country;

            return (
              <Row
                key={item.alpha2}
                itemProps={getItemProps({
                  style,
                  index,
                  item
                })}
                isActive={highlightedIndex === index}
                item={item}
              />
            );
          }}
        />
      </div>
    </Card>
  </div>
);

export default Dropdown;

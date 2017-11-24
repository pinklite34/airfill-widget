import React from 'react';
import VirtualList from 'react-tiny-virtual-list';

import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';

import CountryRow from './CountryRow';
import ProviderRow from './ProviderRow';
import HistoryRow from './HistoryRow';
import SectionTitle from '../SectionTitle';

const styles = {
  container: css({
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    marginTop: -4,
    textAlign: 'left'
  }),
  containerCard: css({
    borderRadius: '0 0 4px 4px !important',
    paddingTop: 4
  }),
  content: css({
    maxHeight: 264,
    overflow: 'scroll !important'
  }),
  sectionTitle: css({
    paddingLeft: 60,
    paddingTop: 6,
    borderTop: '1px solid rgba(0,0,0,0.08)',
    '&:first-of-type': {
      borderTop: '0'
    }
  })
};

const rowComponents = {
  country: CountryRow,
  provider: ProviderRow,
  history: HistoryRow,
  sectionTitle: ({ item, style }) => <div style={style}>{item.title}</div>
};

const Dropdown = ({ getItemProps, items, highlightedIndex }) => {
  const itemCount = items.length;
  const height =
    itemCount < 6
      ? items.reduce(
          (height, item) => height + (item.__type === 'sectionTitle' ? 24 : 44),
          0
        )
      : 264;

  return (
    <div {...styles.container}>
      <Card {...styles.containerCard}>
        <div {...styles.content}>
          <VirtualList
            width="100%"
            height={height}
            scrollToAlignment="auto"
            scrollToIndex={highlightedIndex || undefined}
            itemSize={i => (items[i].__type === 'sectionTitle' ? 24 : 44)}
            itemCount={itemCount}
            renderItem={({ index, style }) => {
              const item = items[index];

              if (item.__type === 'sectionTitle') {
                return (
                  <SectionTitle
                    key={item.key}
                    style={style}
                    {...styles.sectionTitle}
                  >
                    {item.title}
                  </SectionTitle>
                );
              } else {
                const Row = rowComponents[item.__type];

                return (
                  <Row
                    key={item.key}
                    itemProps={getItemProps({
                      style,
                      index: item.index,
                      item
                    })}
                    isActive={item.index === highlightedIndex}
                    item={item}
                  />
                );
              }
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Dropdown;

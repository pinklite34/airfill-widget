import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';

import { css } from 'glamor';
import Card from 'material-ui/Card';

import CountryRow from './CountryRow';
import ProviderRow from './ProviderRow';
import HistoryRow from './HistoryRow';
import SectionTitle from '../SectionTitle';
import { operatorProp, fnProp, countriesProp } from '../../../lib/prop-types';

import { connect } from 'react-redux';
import { selectCountryList } from '../../../store';

const styles = {
  container: css({
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    marginTop: -4,
    textAlign: 'left',
  }),
  containerCard: css({
    borderRadius: '0 0 4px 4px !important',
    paddingTop: 4,
  }),
  content: css({
    maxHeight: 264,
  }),
  sectionTitle: css({
    paddingLeft: 60,
    paddingTop: 6,
    borderTop: '1px solid rgba(0,0,0,0.08)',
    '&:first-of-type': {
      borderTop: '0',
    },
  }),
};

function SectionTitleRow({ item, style }) {
  return <div style={style}>{item.title}</div>;
}

SectionTitleRow.propTypes = {
  item: operatorProp,
  style: PropTypes.object,
};

const rowComponents = {
  country: CountryRow,
  provider: ProviderRow,
  history: HistoryRow,
  sectionTitle: SectionTitleRow,
};

const getRowHeight = (item, countryList) => {
  switch (item.__type) {
    case 'history':
      const country = countryList.find(c => !!c.operators[item.operator]);
      const operator = country.operators[item.operator];
      const hasNumber = !operator.isPinBased;
      return hasNumber ? 68 : 46;
    case 'sectionTitle':
      return 24;
    default:
      return 44;
  }
};

const Dropdown = ({ getItemProps, countryList, items, highlightedIndex }) => {
  const itemCount = items.length;
  const height =
    itemCount < 6
      ? items.reduce(
          (height, item) => height + getRowHeight(item, countryList),
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
            itemSize={i => getRowHeight(items[i], countryList)}
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
                    operatorProps={getItemProps({
                      style,
                      index: item.index,
                      item,
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

Dropdown.propTypes = {
  getItemProps: fnProp,
  countryList: countriesProp,
  items: PropTypes.arrayOf(operatorProp),
  highlightedIndex: PropTypes.number,
};

export default connect(state => ({
  countryList: selectCountryList(state),
}))(Dropdown);

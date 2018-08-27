import * as React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import VirtualList from 'react-tiny-virtual-list';

import { CountryProp } from '../../../lib/prop-types';
import { selectCountryList } from '../../../store';
import Card from '../../UI/Card';
import SectionTitle from '../SectionTitle';
import CountryRow from './CountryRow';
import HistoryRow from './HistoryRow';
import ProviderRow from './ProviderRow';

const Container = styled('div')`
  position: absolute;
  z-index: 10;
  width: 100%;
  margin-top: -4px;
  text-align: left;
`;

const ContainerCard = styled(Card)`
  border-radius: 0 0 4px 4px !important;
  padding-top: 4px;
`;

const Content = styled('div')`
  max-height: 264px;
`;

const Title = styled(SectionTitle)`
  padding-left: 60px;
  padding-top: 6px;
  border-top: ${(p: any) => p.theme.bd.primary};

  &:first-of-type {
    border-top: 0;
  }
`;

function SectionTitleRow({ item, css }) {
  return <div css={css}>{item.title}</div>;
}

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

interface Item {
  __type: string;
  title: string;
  index: number;
  key: number;
}

interface DropdownProps {
  getItemProps: (item: any) => any;
  countryList: CountryProp[];
  items: Item[];
  highlightedIndex: number;
}

const Dropdown = ({
  getItemProps,
  countryList,
  items,
  highlightedIndex,
}: DropdownProps) => {
  const itemCount = items.length;
  const height =
    itemCount < 6
      ? items.reduce(
          (height, item) => height + getRowHeight(item, countryList),
          0
        )
      : 264;

  return (
    <Container>
      <ContainerCard>
        <Content>
          <VirtualList
            width="100%"
            height={height}
            scrollToAlignment={'auto' as any}
            scrollToIndex={highlightedIndex || undefined}
            itemSize={i => getRowHeight(items[i], countryList)}
            itemCount={itemCount}
            renderItem={({ index, style }) => {
              const item = items[index];

              if (item.__type === 'sectionTitle') {
                return (
                  <Title key={item.key} css={style}>
                    {item.title}
                  </Title>
                );
              } else {
                const Row = rowComponents[item.__type];

                return (
                  <Row
                    key={item.key}
                    operatorProps={getItemProps({
                      css: style,
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
        </Content>
      </ContainerCard>
    </Container>
  );
};

export default connect(state => ({
  countryList: selectCountryList(state),
}))(Dropdown);

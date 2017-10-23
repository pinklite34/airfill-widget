import React from 'react';
import { css } from 'glamor';
import { Card } from 'react-toolbox/lib/card';
import flags from '../../flags';

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
  }),
  row: css({
    fontSize: 16,
    borderTop: '1px solid rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center'
  }),
  highlightedRow: css({
    background: 'rgba(0,0,0,0.08)'
  }),
  image: css({
    padding: 12
  }),
  text: css({
    padding: '12px 0'
  })
};

const Dropdown = ({
  getItemProps,
  countries,
  providers,
  history,
  highlightedIndex
}) => (
  <div {...styles.container}>
    <Card {...styles.containerCard}>
      <div {...styles.content}>
        <div {...styles.section}>
          <div {...styles.sectionTitle}>Countries</div>
          {countries.map((item, index) => {
            const Flag = flags[item.alpha2.toLowerCase()];

            return (
              <div
                key={item.alpha2}
                {...getItemProps({ item })}
                {...css([
                  styles.row,
                  highlightedIndex === index ? styles.highlightedRow : null
                ])}
              >
                <div {...styles.image}>
                  {Flag && <Flag width={24} height={18} />}
                </div>
                <div {...styles.text}>{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  </div>
);

export default Dropdown;

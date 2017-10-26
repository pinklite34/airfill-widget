import React from 'react';
import { css } from 'glamor';

const styles = {
  container: css({
    borderTop: '1px solid rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'stretch'
  }),
  active: css({
    background: 'rgba(0,0,0,0.08)'
  }),
  icon: css({
    padding: 12,
    background: 'rgba(0,0,0,0.04)',
    width: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  content: css({
    fontSize: 16,
    padding: 12
  })
}

const Row = ({ itemProps, isActive, icon, content }) => (
  <div
    {...itemProps}
    {...css([
      styles.container,
      isActive && styles.active
    ])}
  >
    <div {...styles.icon}>{icon}</div>
    <div {...styles.content}>{content}</div>
  </div>
);

export default Row;

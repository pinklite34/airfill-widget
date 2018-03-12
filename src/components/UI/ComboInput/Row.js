import React from 'react';
import { css } from 'glamor';
import { rowProps } from '../../../lib/prop-types';

const styles = {
  container: css({
    borderTop: '1px solid rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'stretch',
    cursor: 'pointer',
  }),
  active: css({
    background: 'rgba(0,0,0,0.08)',
  }),
  icon: css({
    background: 'rgba(0,0,0,0.04)',
    width: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  content: css({
    fontSize: 16,
    padding: 12,
  }),
};

export default function Row({ operatorProps, isActive, icon, content }) {
  return (
    <div
      {...operatorProps}
      {...css([styles.container, isActive && styles.active])}
    >
      <div {...styles.icon}>{icon}</div>
      <div {...styles.content}>{content}</div>
    </div>
  );
}

Row.propTypes = rowProps;

import React from 'react';
import { css } from 'react-emotion';
import { rowProps } from '../../../lib/prop-types';

const styles = {
  container: css`
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: stretch;
    cursor: pointer;
  `,
  active: css`
    background: rgba(0, 0, 0, 0.08);
  `,
  icon: css`
    background: rgba(0, 0, 0, 0.04);
    width: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  content: css`
    margin-left: 6px;
    font-size: 16px;
    padding: 12px;
  `,
};

export default function Row({ operatorProps, isActive, icon, content }) {
  return (
    <div
      {...operatorProps}
      className={`${styles.container} ${isActive && styles.active}`}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}

Row.propTypes = rowProps;

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import Card from '../UI/Card';

import More from './more.svg';
import Select from './select.svg';
import { operatorProp, fnProp } from '../../lib/prop-types';

const styles = {
  container: css`
    width: auto;
    flex: 0 1 128px;
    padding: 12px;
    margin: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 12px;
    line-height: 1.4;
    cursor: pointer;

    @media (max-width: 460px) {
      flex: 1 0 100%;
      margin: 0 -16px;
      flex-direction: row !important;
      padding: 16px;
      box-shadow: none !important;
      border-top: 1px solid rgba(0, 0, 0, 0.08);

      &:last-of-type {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        margin-bottom: 6px;
      }

      &:first-of-type {
        margin-top: 6px;
      }
    }
  `,
  logoWrapper: css`
    height: 42px;
    width: 88px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 0 auto;

    @media (max-width: 460px) {
      width: 24;
      height: 18px;
      flex: 0 0 auto;
      margin-right: 12px;
    }
  `,
  logo: css`
    max-height: 42px;
    max-width: 88px;
    display: block;

    @media (max-width: 460px) {
      max-width: 24px;
      max-height: 18px;
    }
  `,
  name: css`
    flex: 1 0 auto;
    font-weight: 500;
    width: 100%;

    @media (max-width: 460px) {
      text-align: left;
    }
  `,
  select: css`
    display: none;

    @media (max-width: 460px) {
      display: block;
    }
  `,
};

export function ShowAll({ onClick, count }) {
  return (
    <Card className={styles.container} onClick={onClick}>
      <div className={styles.logoWrapper}>
        <More fill="#777777" width="42px" height="42px" />
      </div>
      <div>
        Show all <strong>{count}</strong> services
      </div>
      <Select className={styles.select} fill="#777" />
    </Card>
  );
}

ShowAll.propTypes = {
  onClick: fnProp,
  count: PropTypes.node,
};

export default function Provider({ data, onSelect }) {
  return (
    <Card className={styles.container} onClick={onSelect}>
      <div className={styles.logoWrapper}>
        <img src={data.logoImage} alt={data.name} className={styles.logo} />
      </div>
      <div className={styles.name} data-package-slug={data.slug}>
        {data.name}
      </div>
      <Select className={styles.select} fill="#777" />
    </Card>
  );
}

Provider.propTypes = {
  data: operatorProp,
  onSelect: fnProp,
};

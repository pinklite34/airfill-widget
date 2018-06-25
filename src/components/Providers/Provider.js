import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Card from 'material-ui/Card';

import More from './more.svg';
import Select from './select.svg';
import { operatorProp, fnProp } from '../../lib/prop-types';

const styles = {
  container: css({
    width: 'auto',
    flex: '0 1 128px',
    padding: 12,
    margin: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 1.4,
    cursor: 'pointer',
    '@media(max-width: 460px)': {
      flex: '1 0 100%',
      margin: '0 -16px',
      flexDirection: 'row !important',
      padding: 16,
      boxShadow: 'none !important',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      '&:last-of-type': {
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        marginBottom: 6,
      },
      '&:first-of-type': {
        marginTop: 6,
      },
    },
  }),
  logoWrapper: css({
    height: 42,
    width: 88,
    marginBottom: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 0 auto',
    '@media(max-width: 460px)': {
      width: 24,
      height: 18,
      flex: '0 0 auto',
      marginRight: 12,
    },
  }),
  logo: css({
    maxHeight: 42,
    maxWidth: 88,
    display: 'block',
    '@media(max-width: 460px)': {
      maxWidth: 24,
      maxHeight: 18,
    },
  }),
  name: css({
    flex: '1 0 auto',
    fontWeight: 500,
    width: '100%',
    '@media(max-width: 460px)': {
      textAlign: 'left',
    },
  }),
  select: css({
    display: 'none',
    '@media(max-width: 460px)': {
      display: 'block',
    },
  }),
};

export function ShowAll({ onClick, count }) {
  return (
    <Card {...styles.container} onClick={onClick}>
      <div {...styles.logoWrapper}>
        <More fill="#777777" width="42px" height="42px" />
      </div>
      <div>
        Show all <strong>{count}</strong> services
      </div>
      <Select {...styles.select} fill="#777" />
    </Card>
  );
}

ShowAll.propTypes = {
  onClick: fnProp,
  count: PropTypes.node,
};

export default function Provider({ data, onSelect }) {
  return (
    <Card {...styles.container} onClick={onSelect}>
      <div {...styles.logoWrapper}>
        <img src={data.logoImage} alt={data.name} {...styles.logo} />
      </div>
      <div {...styles.name} data-package-slug={data.slug}>
        {data.name}
      </div>
      <Select {...styles.select} fill="#777" />
    </Card>
  );
}

Provider.propTypes = {
  data: operatorProp,
  onSelect: fnProp,
};

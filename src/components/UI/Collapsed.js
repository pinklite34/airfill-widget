import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Button from 'material-ui/Button';

import { darkenProp } from '../../lib/prop-types';

const styles = {
  container: css({
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',
  }),
  button: css({
    backgroundColor: '#fff !important',
    fontSize: '12px !important',
    margin: '-4px !important',
  }),
  text: css({
    fontSize: 16,
    color: '#777777 !important',
    fontWeight: '500 !important',
    '& strong': {
      paddingBottom: 2,
      borderBottom: '1px solid #CCCCCC',
    },
    flex: '1 1 auto',
  }),
};

const background = [
  css({
    backgroundColor: '#EEEEEE',
  }),
  css({
    backgroundColor: '#E3E3E3',
  }),
  css({
    backgroundColor: '#D8D8D8',
  }),
  css({
    backgroundColor: '#CDCDCD',
  }),
];

export default function Collapsed({
  onClick,
  type,
  hideButton,
  children,
  darken = 0,
}) {
  return (
    <div {...styles.container} {...background[darken]}>
      <div {...styles.text}>{children}</div>
      {hideButton ? null : (
        <Button {...styles.button} onClick={onClick}>
          Change {type}
        </Button>
      )}
    </div>
  );
}

Collapsed.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  hideButton: PropTypes.bool,
  children: PropTypes.node,
  darken: darkenProp,
};

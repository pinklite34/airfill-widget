import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Button from 'material-ui/Button';

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

export default function Collapsed({ onClick, type, hideButton, children }) {
  return (
    <div {...styles.container}>
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
};

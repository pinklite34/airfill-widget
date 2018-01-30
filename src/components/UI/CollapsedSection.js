import React from 'react';
import { css } from 'glamor';
import Button from 'material-ui/Button';

const styles = {
  container: css({
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.2s ease'
  }),
  button: css({
    backgroundColor: 'transparent !important',
    fontSize: '12px !important',
    fontWeight: 'bolder !important',
    color: '#777777 !important',
    margin: '-4px !important'
  }),
  text: css({
    fontSize: 16,
    color: '#777777 !important',
    fontWeight: 'bold !important',
    '& strong': {
      paddingBottom: 2,
      borderBottom: '1px solid #CCCCCC'
    },
    flex: '1 0 auto'
  })
};

const background = [
  css({
    backgroundColor: '#EEEEEE'
  }),
  css({
    backgroundColor: '#E3E3E3'
  }),
  css({
    backgroundColor: '#D8D8D8'
  }),
  css({
    backgroundColor: '#CDCDCD'
  })
]

const Collapsed = ({ onClick, type, hideButton, children, darken=0 }) => (
  <div {...styles.container} {...background[darken]}>
    <div {...styles.text}>{children}</div>
    {hideButton ? null : (
      <Button {...styles.button} onClick={onClick}>
        Change {type}
      </Button>
    )}
  </div>
);

export default Collapsed;

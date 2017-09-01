import React from 'react';
import { css } from 'glamor';
import { Button } from 'react-toolbox/lib/button';

const styles = {
  container: css({
    backgroundColor: '#EEEEEE',
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& + &': {
      borderTop: '1px solid rgba(0,0,0,0.08)'
    }
  }),
  button: css({
    backgroundColor: '#fff !important',
    fontSize: '12px !important',
    margin: '-4px !important'
  }),
  text: css({
    fontSize: 14,
    '& strong': {
      paddingBottom: 2,
      borderBottom: '1px solid #CCCCCC'
    }
  })
};

const Collapsed = ({ onClick, type, children }) => (
  <div {...styles.container}>
    <div {...styles.text}>{children}</div>
    <Button {...styles.button} onClick={onClick}>
      Change {type}
    </Button>
  </div>
);

export default Collapsed;

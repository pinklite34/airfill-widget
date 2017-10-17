import React from 'react';
import { css } from 'glamor';

import { Button } from 'react-toolbox/lib/button';

const styles = {
  container: css({
    backgroundColor: '#fff',
    margin: -20,
    marginBottom: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.16)',
    position: 'relative'
  }),
  logo: css({
    width: 150,
    height: 71,
    flex: '0 0 auto',
    marginRight: 20
  }),
  button: css({
    width: 220,
    marginRight: 8,
    marginTop: 8
  }),
  content: css({
    flex: '0 1 auto'
  }),
  text: css({
    marginTop: 0
  })
};

const SuggestedOperator = ({ operator, onAccept, onReject }) => (
  <div {...styles.container}>
    <img src={operator.logoImage} alt={operator.name} {...styles.logo} />
    <div {...styles.content}>
      <p {...styles.text}>
        We've detected <strong>{operator.name}</strong> as your operator. If
        this is not correct, please select another operator below.
      </p>
      <Button primary raised onClick={onAccept} {...styles.button}>
        Yes, this is my operator
      </Button>
      <Button raised onClick={onReject} {...styles.button}>
        No, it's not correct
      </Button>
    </div>
  </div>
);

export default SuggestedOperator;

import React from 'react';
import { css } from 'glamor';

import { Button } from 'react-toolbox/lib/button';
import Info from '../UI/info.svg';

const styles = {
  container: css({
    backgroundColor: '#fff',
    margin: -16,
    marginBottom: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.16)',
    position: 'relative',
    '@media(max-width: 460px)': {
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }),
  logo: css({
    maxWidth: 150,
    maxHeight: 71,
    flex: '0 0 auto',
    marginRight: 20,
    '@media(max-width: 460px)': {
      marginBottom: 20
    }
  }),
  button: css({
    width: 220,
    marginRight: 8,
    marginTop: 8
  }),
  content: css({
    flex: '0 1 auto',
    '@media(max-width: 460px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }),
  text: css({
    marginTop: 0
  }),
  error: css({
    margin: 0
  }),
  icon: css({
    width: 24,
    height: 24,
    fill: '#555555',
    flex: '0 0 auto',
    marginRight: 8
  })
};

const SuggestedOperator = ({ operator, onAccept, onReject }) => {
  if (operator) {
    return (
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
  } else {
    return (
      <div {...styles.container}>
        <Info {...styles.icon} />
        <div {...styles.content}>
          <p {...styles.error}>
            We could not automatically identify your operator. Please select the
            provider below.
          </p>
        </div>
      </div>
    );
  }
};

export default SuggestedOperator;

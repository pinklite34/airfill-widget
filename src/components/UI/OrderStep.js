import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'glamor';
import { CircularProgress } from 'material-ui/Progress';
import Check from './check.svg';
import Error from './error.svg';

const styles = {
  container: css({
    display: 'flex',
    opacity: 0.6,
    '& + &': {
      marginTop: 12
    },
    '&:last-of-type': {
      opacity: 1
    },
    alignItems: 'center'
  }),
  icon: css({
    height: '19px !important',
    width: '19px !important',
    marginRight: 8
  })
}

const OrderStep = ({children, done, error}) => {
  return (
    <h3 {...styles.container}>
      {error ? <Error fill="#E1283C" {...styles.icon} /> :
        done ? <Check fill="#98AE0A" {...styles.icon} /> :
        <CircularProgress className={`${styles.icon}`} />
      }
      {children}
    </h3>
  );
};

OrderStep.propTypes = {
  children: PropTypes.node.isRequired,
  done: PropTypes.bool,
  error: PropTypes.bool
};

export default OrderStep;

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '20px',
  }),
  instruction: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: '1 1 auto',
    lineHeight: 1.4,
    fontSize: 14,
    '& + &': {
      marginTop: 20,
    },
    '@media(min-width: 620px)': {
      flexDirection: 'column',
      textAlign: 'center',
      flex: '0 0 180px',
      '& + &': {
        marginTop: 0,
      },
    },
  }),
  badge: css({
    width: 40,
    height: 40,
    borderRadius: 20,
    border: '2px solid #009FE6',
    color: '#009FE6',
    fontSize: 20,
    fontWeight: 700,
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    '@media(min-width: 620px)': {
      marginRight: 0,
    },
  }),
  title: css({
    color: '#2079D6',
    margin: 0,
    '@media(min-width: 620px)': {
      margin: '8px 0',
    },
  }),
  content: css({
    flex: '1 1 auto',
  }),
};

function Instruction({ number, title, children }) {
  return (
    <div {...styles.instruction}>
      <div {...styles.badge}>{number}</div>
      <div {...styles.content}>
        <h3 {...styles.title}>{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
}

Instruction.propTypes = {
  number: PropTypes.number,
  title: PropTypes.node,
  children: PropTypes.node,
};

export default function Instructions() {
  return (
    <div {...styles.container}>
      <Instruction number={1} title="Find a service">
        Select a country or enter a phone number to see available services
      </Instruction>
      <Instruction number={2} title="Pick package &amp; pay">
        Select your desired refill amount and pay with a single click
      </Instruction>
      <Instruction number={3} title="Instant refill delivery">
        We send your refill the second we receive your payment
      </Instruction>
    </div>
  );
}

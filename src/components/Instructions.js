import React from 'react';
import { css } from 'glamor';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '20px'
  }),
  instruction: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: '0 1 168px',
    lineHeight: 1.4,
    fontSize: 14
  }),
  badge: css({
    width: 40,
    height: 40,
    borderRadius: 20,
    border: '2px solid #009FE6',
    color: '#009FE6',
    fontSize: 20,
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  title: css({
    color: '#2079D6',
    margin: '8px 0'
  })
};

const Badge = ({ children }) => <div {...styles.badge}>{children}</div>;

const Instruction = ({ number, title, children }) => (
  <div {...styles.instruction}>
    <Badge>{number}</Badge>
    <h3 {...styles.title}>{title}</h3>
    <div>{children}</div>
  </div>
);

const Instructions = () => (
  <div {...styles.container}>
    <Instruction number={1} title="Find a service">
      Select a country or enter a phone number to see available operators
    </Instruction>
    <Instruction number={2} title="Pick package & pay">
      Select your desired refill amount and pay with a single click
    </Instruction>
    <Instruction number={3} title="Instant refill delivery">
      We send your refill the second we receive your payment
    </Instruction>
  </div>
);

export default Instructions;

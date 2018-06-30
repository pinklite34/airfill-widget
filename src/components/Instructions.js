import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
  `,
  instruction: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 auto;
    line-height: 1.4;
    font-size: 14px;
    & + & {
      margin-top: 20px;
    }

    @media (min-width: 620px) {
      flex-direction: column;
      text-align: center;
      flex: 0 0 180px;

      & + & {
        margin-top: 0;
      }
    }
  `,
  badge: css`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 2px solid #009fe6;
    color: #009fe6;
    font-size: 20px;
    font-weight: 700;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    @media (min-width: 620px) {
      margin-right: 0;
    }
  `,
  title: css`
    color: #2079d6;
    margin: 0px;

    @media (min-width: 620px) {
      margin: 8px 0;
    }
  `,
  content: css`
    flex: 1 1 auto;
    width: 100%;
  `,
};

function Instruction({ number, title, children }) {
  return (
    <div className={styles.instruction}>
      <div className={styles.badge}>{number}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
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
    <div className={styles.container}>
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

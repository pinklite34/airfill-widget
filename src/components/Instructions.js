import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

import { transProp } from '../lib/prop-types';
import DeviceInfo from '../lib/DeviceInfo';

import Text from './UI/Text';

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  `,
  instruction: css`
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    line-height: 1.4;
    font-size: 14px;

    & + & {
      margin-top: 20px;
    }

    @media (min-width: 720px) {
      flex-direction: column;
      align-items: center;
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

    @media (min-width: 720px) {
      margin-right: 0;
    }
  `,
  title: css`
    color: #2079d6;
    margin: 0px;

    @media (min-width: 720px) {
      margin: 8px 0;
    }
  `,
  content: css`
    flex: 1 1 auto;
    width: 100%;
  `,
};

function Instruction({ number, title, description }) {
  return (
    <DeviceInfo>
      {({ greaterThan }) => (
        <div className={styles.instruction}>
          <div className={styles.badge}>{number}</div>
          <div className={styles.content}>
            <Text
              type="h3"
              centered={greaterThan.tablet}
              className={styles.title}
              {...title}
            />
            <Text
              type="p"
              size="14px"
              tight
              centered={greaterThan.tablet}
              {...description}
            />
          </div>
        </div>
      )}
    </DeviceInfo>
  );
}

Instruction.propTypes = {
  number: PropTypes.number,
  title: transProp,
  description: transProp,
};

export default function Instructions() {
  return (
    <div className={styles.container}>
      <Instruction
        number={1}
        title={{
          id: 'instructions.title1',
          children: 'Find a service',
        }}
        description={{
          id: 'instructions.description1',
          children:
            'Select a country or enter a phone number to see available services',
        }}
      />
      <Instruction
        number={2}
        title={{
          id: 'instructions.title2',
          children: 'Pick package & pay',
        }}
        description={{
          id: 'instructions.description2',
          children:
            'Select your desired refill amount and pay with a single click',
        }}
      />
      <Instruction
        number={3}
        title={{
          id: 'instructions.title3',
          children: 'Instant refill delivery',
        }}
        description={{
          id: 'instructions.description3',
          children: 'We send your refill the second we receive your payment',
        }}
      />
    </div>
  );
}

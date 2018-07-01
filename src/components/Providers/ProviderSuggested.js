import React from 'react';
import { css } from 'react-emotion';

import Button from '../UI/Button';
import Info from '../UI/info.svg';
import { operatorProp, fnProp } from '../../lib/prop-types';

const styles = {
  container: css`
    background-color: #fff;
    margin: -16px;
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
    position: relative;

    @media (max-width: 460px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  logo: css`
    max-width: 150px;
    max-height: 71px;
    flex: 0 0 auto;
    margin-right: 20px;

    @media (max-width: 460px) {
      margin-bottom: 20px;
    }
  `,
  button: css`
    width: 230px;
    margin-right: 8px;
    margin-top: 8px;
  `,
  content: css`
    flex: 0 1 auto;
    
    @media (max-width: 460px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    },
  `,
  text: css`
    margin-top: 0px;
  `,
  error: css`
    margin: 0;
  `,
  icon: css`
    width: 24px;
    height: 24px;
    fill: #555555;
    flex: 0 0 auto;
    margin-right: 8px;
  `,
};

export default function ProviderSuggested({ operator, onAccept, onReject }) {
  return operator ? (
    <div className={styles.container}>
      <img
        src={operator.logoImage}
        alt={operator.name}
        className={styles.logo}
      />
      <div className={styles.content}>
        <p className={styles.text}>
          We&apos;ve detected <strong>{operator.name}</strong> as your service.
          If this is not correct, please select another service below.
        </p>
        <Button onClick={onAccept} className={styles.button}>
          Yes, this is my service
        </Button>
        <Button onClick={onReject} className={styles.button}>
          No, it&apos;s not correct
        </Button>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <Info className={styles.icon} />
      <div className={styles.content}>
        <p className={styles.error}>
          We could not automatically identify your service. Please select the
          service below.
        </p>
      </div>
    </div>
  );
}

ProviderSuggested.propTypes = {
  operator: operatorProp,
  onAccept: fnProp,
  onReject: fnProp,
};

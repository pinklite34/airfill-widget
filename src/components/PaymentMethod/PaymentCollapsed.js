import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectPaymentMethod } from '../../store';
import { historyProp, operatorProp } from '../../lib/prop-types';

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  icon: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    margin-right: 30px;
    margin-left: 14px;

    @media (max-width: 460px) {
      margin-right: 14px;
      margin-left: 0px;
    },
  `,
};

function PaymentCollapsed({ operator, history, selectedMethod }) {
  let icon = selectedMethod && selectedMethod.icon;
  if (typeof icon === 'string') {
    icon = <img src={icon} />;
  }

  return (
    <Collapsed
      onClick={() => history.push('/refill/selectPayment')}
      type="payment">
      {operator && (
        <div className={styles.container}>
          <img src={icon} className={styles.icon} />
          {selectedMethod && selectedMethod.title}
        </div>
      )}
    </Collapsed>
  );
}

PaymentCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
  selectedMethod: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    selectedMethod: selectPaymentMethod(state),
  }))
)(PaymentCollapsed);

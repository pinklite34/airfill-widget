import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectPaymentMethod } from '../../store';
import { historyProp, darkenProp, operatorProp } from '../../lib/prop-types';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  icon: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    marginRight: 30,
    marginLeft: 14,
    '@media(max-width: 460px)': {
      marginRight: 14,
      marginLeft: 0,
    },
  }),
  logo: css({
    maxWidth: 40,
    maxHeight: 30,
  }),
};

function PaymentCollapsed({ operator, history, darken, selectedMethod }) {
  return (
    <Collapsed
      darken={darken}
      onClick={() => history.push('/refill/selectPayment')}
      type="provider">
      {operator && (
        <div {...styles.container}>
          <div {...styles.icon}>
            <img
              src={operator.logoImage}
              alt={operator.name}
              {...styles.logo}
            />
          </div>
          {selectedMethod.title}
        </div>
      )}
    </Collapsed>
  );
}

PaymentCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
  darken: darkenProp,
  selectedMethod: PropTypes.object.isRequired,
};

export default withRouter(
  connect(state => ({
    operator: selectSelectedOperator(state),
    selectedMethod: selectPaymentMethod(state),
  }))(PaymentCollapsed)
);

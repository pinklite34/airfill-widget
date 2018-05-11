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
};

function PaymentCollapsed({ operator, history, darken, selectedMethod }) {
  let icon = selectedMethod.icon;
  if (typeof icon === 'string') {
    icon = <img src={icon} />;
  }

  return (
    <Collapsed
      darken={darken}
      onClick={() => history.push('/refill/selectPayment')}
      type="payment">
      {operator && (
        <div {...styles.container}>
          <img src={selectedMethod.icon} {...styles.icon} />
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

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Collapsed from '../UI/Collapsed';
import { selectSelectedOperator, selectPaymentMethod } from '../../store';
import { historyProp, operatorProp } from '../../lib/prop-types';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled('img')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  margin-right: 30px;
  margin-left: 14px;

  @media (max-width: ${p => p.theme.bp.mobile}) {
    margin-right: 14px;
    margin-left: 0px;
  }
`;

function PaymentCollapsed({ operator, history, selectedMethod = {} }) {
  const icon = selectedMethod && selectedMethod.icon;
  return (
    <Collapsed
      onClick={() => history.push('/refill/selectPayment')}
      type="payment">
      {operator && (
        <Container>
          {typeof icon === 'string' ? (
            <Icon src={selectedMethod && selectedMethod.icon} />
          ) : (
            icon
          )}
          {selectedMethod && selectedMethod.title}
        </Container>
      )}
    </Collapsed>
  );
}

PaymentCollapsed.propTypes = {
  operator: operatorProp,
  history: historyProp,
  selectedMethod: PropTypes.object,
};

export default compose(
  withRouter,
  connect(state => ({
    operator: selectSelectedOperator(state),
    selectedMethod: selectPaymentMethod(state),
  }))
)(PaymentCollapsed);

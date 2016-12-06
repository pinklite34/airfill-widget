import {selectOrder} from './order';

export default (state={}, {type, payload}) => {
  if (type === 'UPDATE_PAYMENT_STATUS') {
    const { orderId, status, data } = payload;

    const nextState = { ...state };
    nextState[orderId] = { status };

    if (status === 'partial') {
      nextState[orderId].paidAmount = data;
    }
    if (status === 'failed') {
      nextState[orderId].failureData = data;
    }
    if (status === 'delivered') {
      nextState[orderId].deliveryData = data;
    }

    return nextState;
  }

  return state;
};

export const selectPaymentStatus = (state) => {
  const order = selectOrder(state);
  if (order.result && order.result.orderId) {
    return state.paymentStatus[order.result.orderId] || {};
  }
  return {};
};

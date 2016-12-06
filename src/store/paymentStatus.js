import {selectOrder} from './order';

export default (state={}, {type, payload}) => {
  switch (type) {
    case 'UPDATE_PAYMENT_STATUS': {
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

    case 'LOAD_ORDER_SUCCESS': {
      const {
        id,
        delivered,
        error,
        errorMessage,
        sent,
        paymentReceived
      } = payload;
      let status = state[id].status;

      /*if (order.refunded) {
        status = 'refunded';
      } else */
      if (delivered) {
        status = 'delivered';
      } else if (error || errorMessage) {
        status = 'failed';
      } else if (sent) {
        status = 'confirmed';
      } else if (paymentReceived) {
        status = 'paid';
      }

      const nextState = { ...state };
      nextState[id] = { status };
    }

    default:
      return state;
  }
};

export const selectPaymentStatus = (state) => {
  const order = selectOrder(state);
  if (order.result && order.result.orderId) {
    return state.paymentStatus[order.result.orderId] || {};
  }
  return {};
};

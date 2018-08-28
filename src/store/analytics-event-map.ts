import { EventTypes } from 'redux-segment';
import { OrderResult } from './../lib/prop-types';

import {
  createEvent,
  eventPropertiesForOrder,
  eventPropertiesForProduct,
} from '../lib/analytics';
import { selectOrder } from './order';

export function eventTypeForOrderStatus(status) {
  switch (status) {
    case 'paid':
      return 'Refill Payment Detected';
    case 'confirmed':
      return 'Refill Payment Confirmed';
    case 'partial':
      return 'Refill Partial Payment';
    case 'expired':
      return 'Refill Payment Expired';
    case 'failed':
      return 'Refill Delivery Error';
    case 'delivered':
      return 'Refill Delivered';
    case 'balance-too-low':
      return 'Refill Payment Failed';
    default:
      return 'Refill Unknown Status: ' + status;
  }
}

export default {
  mapper: {
    SET_AMOUNT: (getState, { payload }) => {
      return payload
        ? createEvent(getState(), EventTypes.track, {
            event: 'Refill Package Selected',
            properties: {
              amount: payload,
            },
          })
        : null;
    },

    LOAD_NUMBERLOOKUP: (getState, action) => {
      return createEvent(getState(), EventTypes.track, {
        event: 'Refill Number Lookup',
        properties: action.payload.query,
      });
    },

    LOAD_OPERATOR_SUCCESS: (getState, action) => {
      const properties = eventPropertiesForProduct(action.payload);
      return (
        properties &&
        createEvent(getState(), EventTypes.track, {
          event: 'Product Viewed',
          properties,
        })
      );
    },

    LOAD_ORDER: (getState, action) => {
      return createEvent(getState(), EventTypes.track, {
        event: 'Refill Order Loaded',
        properties: action.payload.body,
      });
    },

    LOAD_ORDER_SUCCESS: (getState, action) => {
      const properties = eventPropertiesForOrder(action.payload);
      return (
        properties &&
        createEvent(getState(), EventTypes.track, {
          event: 'Checkout Started',
          properties,
        })
      );
    },

    UPDATE_PAYMENT_STATUS: (getState, { payload }) => {
      const { status, data } = payload;
      const isComplete = status === 'confirmed' && typeof data !== 'undefined';
      const state = getState();
      const orderResult: OrderResult = selectOrder(state);
      const order = orderResult && orderResult.result;

      return [
        createEvent(state, EventTypes.track, {
          event: eventTypeForOrderStatus(status),
          properties: payload,
        }),
        isComplete
          ? createEvent(state, EventTypes.track, {
              event: 'Order Completed',
              properties: eventPropertiesForOrder(order),
            })
          : createEvent(state, EventTypes.track, {
              event: 'Order Updated',
              properties: eventPropertiesForOrder(order),
            }),
      ].filter(Boolean);
    },
  },
};

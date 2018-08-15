import { EventTypes } from 'redux-segment';

import { getPlatform, getSource, isMobileApp } from '../lib/globals';
import { selectOrder } from './order';

const eventTypeForOrderStatus = status => {
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
};

const eventPropertiesForOrder = order => {
  try {
    const { id, eurPrice, paymentMethod, operator, itemDesc } = order;
    return {
      ...order,
      order_id: id,
      affiliation: 'bitrefill',
      value: eurPrice,
      revenue: eurPrice,
      label: paymentMethod,
      currency: 'EUR',
      products: [
        {
          product_id: operator,
          sku: operator,
          name: itemDesc,
          price: eurPrice,
          quantity: 1,
          category: order.operatorType,
        },
      ],
    };
  } catch (error) {
    console.error(error);
  }
};

function createEvent(state, eventType, payload) {
  payload = payload || { properties: {} };

  const source = getSource();
  const platform = getPlatform();

  const additionalKey = payload.traits ? 'traits' : 'properties';
  const additionalProps = {
    category: isMobileApp() ? platform : 'website',
    user_source: source,
    user_source_platform: platform,
  };

  return {
    eventType,
    eventPayload: {
      ...payload,
      [additionalKey]: {
        ...additionalProps,
        ...payload[additionalKey],
      },
    },
  };
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

      return [
        createEvent(state, EventTypes.track, {
          event: eventTypeForOrderStatus(status),
          properties: payload,
        }),
        isComplete
          ? createEvent(state, EventTypes.track, {
              event: 'Order Completed',
              properties: eventPropertiesForOrder(selectOrder(state).result),
            })
          : null,
      ].filter(Boolean);
    },
  },
};

import { EventTypes } from 'redux-segment';
import { selectOrder } from './../store/order';

import { OrderResult } from 'lib/prop-types';
import {
  eventPropertiesForProduct,
  productPropertiesForOrder,
} from '../lib/analytics';
import { selectOperatorBySlug } from '../store/inventory';

export function trackEvent(event: string, payload: any) {
  return {
    type: 'SEGMENT_TRACK',
    payload: {},
    meta: {
      analytics: {
        eventType: EventTypes.track,
        eventPayload: {
          event,
          properties: payload,
        },
      },
    },
  };
}

export function trackProductEvent(event: string, productOrSlug) {
  return (dispatch, getState) => {
    const state = getState();

    const product =
      typeof productOrSlug === 'string'
        ? selectOperatorBySlug(state, productOrSlug)
        : productOrSlug;

    const orderResult: OrderResult = selectOrder(state);
    const order = orderResult && orderResult.result;

    if (product) {
      dispatch(
        trackEvent(event, {
          ...productPropertiesForOrder(order),
          ...eventPropertiesForProduct(product),
        })
      );
    }
  };
}

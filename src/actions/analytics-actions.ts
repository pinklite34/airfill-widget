import { EventTypes } from 'redux-segment';
import { selectOrder } from './../store/order';
import { Product } from './../types';

import {
  createEvent,
  eventPropertiesForProduct,
  productPropertiesForOrder,
} from '../lib/analytics';
import { selectOperatorBySlug } from '../store/inventory';
import { OrderResult } from '../types';

export function trackEvent(event: string, payload: object) {
  return (dispatch, getState) =>
    dispatch({
      type: 'SEGMENT_TRACK',
      payload: {},
      meta: {
        analytics: createEvent(getState(), EventTypes.track, {
          event,
          properties: payload,
        }),
      },
    });
}

export function trackProductEvent(
  event: string,
  productOrSlug: string | Product
) {
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

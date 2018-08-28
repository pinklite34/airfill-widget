import { Order, Product, RootState } from '../types';

import { getPlatform, getSource, isMobileApp } from '../lib/globals';

export function productPropertiesForOrder(order?: Order) {
  return order
    ? {
        product_id: order.operator,
        sku: order.operator,
        name: order.itemDesc,
        price: order.eurPrice,
        quantity: 1,
        category: order.operatorType,
        currency: 'EUR',
      }
    : {};
}

export function eventPropertiesForOrder(order?: Order) {
  return order
    ? {
        ...order,
        order_id: order.id,
        affiliation: 'bitrefill',
        value: order.eurPrice,
        revenue: order.eurPrice,
        label: order.paymentMethod,
        currency: 'EUR',
        products: [productPropertiesForOrder(order)],
      }
    : null;
}

export function eventPropertiesForProduct(product?: Product) {
  return product
    ? {
        ...product,
        product_id: product.slug,
        sku: product.slug,
        category: product.type,
        name,
        image_url: product.logoImage,
      }
    : null;
}

export function createEvent(
  state: RootState,
  eventType: string,
  payload
): object {
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

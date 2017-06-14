import React from 'react';
import { selectValidAmount } from './index';

const props = {
  amount: 0,
  packages: [
    {
      value: 10,
      btcPrice: 0.01,
      usdPrice: 15
    },
    {
      value: 20,
      btcPrice: 0.02,
      usdPrice: 30
    },
    {
      value: 30,
      btcPrice: 0.03,
      usdPrice: 45
    },
    {
      value: 40,
      btcPrice: 0.04,
      usdPrice: 60
    }
  ],
  currency: 'XBT',
  maxCost: Number.POSITIVE_INFINITY,
  costConversionRate: 100000, // btc per "currency" in satoshi
  ranged: false
};

describe('selectValidAmount', () => {
  it('should select the middle package by default', () => {
    expect(selectValidAmount({ ...props })).toEqual(30);
    expect(selectValidAmount({ ...props, ranged: true })).toEqual(30);
  });

  it('should pass through the value if a matching package exists', () => {
    expect(
      selectValidAmount({
        ...props,
        amount: 20
      })
    ).toEqual(20);
  });

  it('should select the highest value package the user can afford (maxCost) if no matching packages are found', () => {
    expect(
      selectValidAmount({
        ...props,
        amount: null,
        maxCost: 0.025,
        ranged: false
      })
    ).toEqual(20);
  });

  it('should allow arbitrary values (costing less maxCost) for ranged operators', () => {
    expect(
      selectValidAmount({
        ...props,
        amount: 21,
        maxCost: 0.025,
        ranged: true
      })
    ).toEqual(21);

    expect(
      selectValidAmount({
        ...props,
        amount: 21,
        maxCost: 0.021,
        ranged: true
      })
    ).toEqual(21);

    expect(
      selectValidAmount({
        ...props,
        amount: 25,
        maxCost: 0.021,
        ranged: true
      })
    ).toEqual(21);
  });

  it('should handle non-BTC billing currencies', () => {
    expect(
      selectValidAmount({
        ...props,
        amount: 10,
        maxCost: 25,
        costConversionRate: 1.5,
        currency: 'USD',
        ranged: true
      })
    ).toEqual(10);

    expect(
      selectValidAmount({
        ...props,
        amount: 10,
        maxCost: 15,
        costConversionRate: 1.5,
        currency: 'USD',
        ranged: true
      })
    ).toEqual(10);

    expect(
      selectValidAmount({
        ...props,
        amount: 15,
        maxCost: 15,
        costConversionRate: 1.5,
        currency: 'USD',
        ranged: true
      })
    ).toEqual(10);
  });

});

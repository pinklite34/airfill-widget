import { selectValidAmount } from './amount-validation';

const packages = [
  {
    value: 10,
    btcPrice: 0.01,
    usdPrice: 15,
  },
  {
    value: 20,
    btcPrice: 0.02,
    usdPrice: 30,
  },
  {
    value: 30,
    btcPrice: 0.03,
    usdPrice: 45,
  },
  {
    value: 40,
    btcPrice: 0.04,
    usdPrice: 60,
  },
];

describe('selectValidAmount', () => {
  it('all: select package from low balance', () => {
    expect(selectValidAmount(packages, 'XBT', 0.02)).toEqual(20);
    expect(selectValidAmount(packages, 'USD', 45)).toEqual(30);
  });

  it('all: select amount with no balance', () => {
    // no balance, pick most expensive pkg
    expect(selectValidAmount(packages, 'XBT', 0)).toEqual(40);
    expect(selectValidAmount(packages, 'USD', 0)).toEqual(40);
  });

  it('ranged: picks ranged stuff', () => {
    expect(
      selectValidAmount(packages, 'XBT', 0.1, {
        max: 6000,
        min: 500,
        step: 1,
        userPriceRate: 1.5,
      })
    ).toEqual(6000);
  });
});

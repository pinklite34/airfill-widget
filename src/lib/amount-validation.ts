import { Amount, BillingCurrency, Package, RangeProp } from '../types';

import { getDisplayName } from './currency-helpers';

// if package is affordable with current user balance
// is affordable if no balance is set
export function isAffordable(
  pkg: Package,
  billingCurrency: BillingCurrency,
  balance: Amount
) {
  const costKey = getDisplayName(billingCurrency).toLowerCase() + 'Price';

  return !balance || pkg[costKey] <= balance;
}

export function selectValidAmount(
  packages: Package[],
  billingCurrency: BillingCurrency,
  balance?: Amount,
  range?: RangeProp
) {
  if (range) {
    const correctMax =
      billingCurrency === 'XBT'
        ? ((balance as number) * 100000000) / range.userPriceRate
        : (balance as number) / range.userPriceRate;

    if (correctMax < range.min) {
      return 0;
    } else if (correctMax < range.max) {
      return correctMax.toFixed();
    } else {
      return range.max;
    }
  } else {
    const costKey = getDisplayName(billingCurrency).toLowerCase() + 'Price';

    const f = packages
      .sort((a, b) => (a[costKey] < b[costKey] ? 1 : -1))
      .filter(pkg => isAffordable(pkg, billingCurrency, balance));

    // pick highest affordable or most expensive, if no affordable
    return f.length > 0 ? f[0].value : packages[0].value;
  }
}

import { getDisplayName } from './currency-helpers';

// Handle XBT
export const getCostForAmount = (conversionRate, amount) =>
  Number(amount * conversionRate).toFixed(2);

const pickMiddlePackage = ({ packages }) => {
  const middle = Math.round((packages.length - 1) * 0.6);
  const pkg = packages[middle];
  return pkg ? String(pkg.value) : null;
};

const pickAffordablePackage = ({ packages, amount, currency, maxCost }) => {
  const costKey = getDisplayName(currency).toLowerCase() + 'Price';

  const isAffordable = pkg => pkg[costKey] <= maxCost;

  // Make sure user can afford the selected package
  const selectedPackage = packages.find(pkg => String(pkg.value) === amount);
  if (selectedPackage && isAffordable(selectedPackage)) {
    return amount;
  }

  // Otherwise try to pick the highest value package the user can afford
  const highestAffordablePackage = packages.filter(isAffordable).pop();

  if (highestAffordablePackage) {
    return Number(highestAffordablePackage.value);
  }

  // If there are no packages the user can afford, return the amount as is
  return amount;
};

export const selectValidPackage = ({ packages, maxCost, currency, amount }) => {
  // If no amount is selected, pick a package in the middle
  amount = amount ? String(amount) : pickMiddlePackage({ packages });

  // Make sure user can afford the package
  return pickAffordablePackage({ packages, amount, maxCost, currency });
};

const rangedCostForAmount = (conversionRate, currency, amount) => {
  let amountCost = amount * conversionRate;
  // BTC
  if (currency === 'XBT') {
    return Math.ceil(amountCost / 100) / 1000000;
  } else {
    // USD or EUR
    return Number(amountCost.toFixed(2));
  }
};

const selectValidRangedAmount = ({
  amount,
  maxCost,
  costConversionRate,
  currency
}) => {
  const selectedAmountCost = rangedCostForAmount(
    costConversionRate,
    currency,
    amount
  );

  if (selectedAmountCost <= maxCost) {
    return String(amount); // Return amount as is for ranged operators
  } else {
    if (currency === 'XBT') {
      const amountForMaxCost = Math.floor(
        maxCost * 100000000 / costConversionRate
      );
      return String(amountForMaxCost); // Return the maximum amount allowed
    } else {
      return String(maxCost / costConversionRate);
    }
  }
};

export const selectValidAmount = args => {
  const ranged = args.ranged;
  const validPackageAmount = selectValidPackage(args);

  if (ranged) {
    return selectValidRangedAmount({
      ...args,
      amount: args.amount || validPackageAmount
    });
  } else {
    return validPackageAmount;
  }
};


// Internally we use XBT, however the correct display name is BTC
export const getDisplayName = currency =>
  currency === 'XBT' ? 'BTC' : currency;

// Price is located on eurPrice, usdPrice or btcPrice
export const getPriceKey = currency =>
  `${getDisplayName(currency).toLowerCase()}Price`;

// Return price for specified currency
export const getPrice = (pkg, currency) => pkg[getPriceKey(currency)];

// Convert Satoshi to Bitcoins
export const satoshiToBTC = amount => Math.ceil(amount / 100) / 1000000;

const supportedCoins = ['bitcoin', 'litecoin', 'lightning', 'dash'];

// If we can afford the selected payment method
export const canAfford = ({
  order,
  accountBalance,
  billingCurrency,
  paymentMode,
  requireAccountBalance,
}) => {
  const isDirect = supportedCoins.some(v => v === paymentMode);
  const price = order[getPriceKey(billingCurrency)];
  const canAfford = price <= accountBalance;

  return !requireAccountBalance && (isDirect || canAfford);
};

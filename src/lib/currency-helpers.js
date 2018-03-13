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

// All altcoins that requires a watched address from the server
const supportedCoins = ['bitcoin', 'litecoin', 'lightning', 'dash'];

export const isDirectPayment = method => supportedCoins.some(x => x === method);

// If we can afford the selected payment method
export const canAfford = ({
  amount,
  btcPrice,
  packages,
  accountBalance,
  paymentMode,
  requireAccountBalance,
  operator,
}) => {
  // payment independent of account balance
  const isDirect = isDirectPayment(paymentMode);

  if (!btcPrice) {
    // we don't have the bitcoin price, but we have the custom range
    if (operator.range) {
      btcPrice = amount * (operator.range.customerSatoshiPriceRate / 100000000);
    } else {
      // we don't have anythimg, find the correct btcPrice from packages
      btcPrice = packages.find(x => x.value == amount).btcPrice; // eslint-disable-line
    }
  }

  let canAfford = btcPrice <= accountBalance;

  if (btcPrice <= 0.001 && paymentMode === 'localbitcoins') return false;

  return !requireAccountBalance || isDirect || canAfford;
};

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
  accountBalance,
  paymentMode,
  requireAccountBalance,
  operator,
}) => {
  // payment independent of account balance
  const isDirect = isDirectPayment(paymentMode);

  btcPrice =
    btcPrice || amount * (operator.range.customerSatoshiPriceRate / 100000000);

  const canAfford = btcPrice <= accountBalance;

  return !requireAccountBalance || isDirect || canAfford;
};

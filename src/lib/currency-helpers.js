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
const supportedCoins = [
  'bitcoin',
  'litecoin',
  'ethereum',
  'dash',
  'dogecoin',
  'lightning',
  'lightning-ltc',
];

const lightningCoins = ['lightning', 'lightning-ltc'];

export const isDirectPayment = method => supportedCoins.some(x => x === method);

export const isLightningPayment = method =>
  lightningCoins.some(x => x === method);

export const canAfford = ({
  // user account balance (in user currency)
  accountBalance = Number.POSITIVE_INFINITY,

  // require account balance to use this method?
  requireAccountBalance,

  // user billing currency
  billingCurrency,

  // selected operator
  operator,

  // picked amount (package amount or ranged)
  amount,

  // payment mode
  mode,
}) => {
  if (isDirectPayment(mode)) {
    return true;
  }

  if (!operator) return false;

  // if account balance is NaN, it's loading
  if (accountBalance !== undefined && isNaN(accountBalance)) {
    return false;
  }

  let price = 0;
  let btcPrice = 0;

  // operator has range, take picked amount (like 100 INR) and
  // multiply by userPriceRate, which will get price in user currency (like 1.59 USD for 100 INR)
  if (operator.range) {
    let rate = operator.range.userPriceRate;
    if (billingCurrency === 'XBT') {
      rate /= 100000000;
    }

    price = amount * rate;

    if (billingCurrency === 'XBT') {
      btcPrice = price;
    } else {
      btcPrice = amount * (operator.range.customerSatoshiPriceRate / 100000000);
    }
  } else {
    // no range, only static packages. find matching with picked amount
    // amount is set as string, and value is number, therefor no ===
    /* eslint-disable */
    const pkg = operator.packages.find(x => x.value == amount);
    price = getPrice(pkg, billingCurrency);
    btcPrice = getPrice(pkg, 'XBT');
  }


  if (btcPrice < 0.001 && mode === 'localbitcoins') return false;
  if (btcPrice > 0.04294967 && mode === 'lightning') return false;

  if (!requireAccountBalance) {
    return true;
  }

  return price <= accountBalance;
};

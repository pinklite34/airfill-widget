import PropTypes from 'prop-types';

export const transProp = PropTypes.oneOfType([
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  }),
  PropTypes.shape({
    children: PropTypes.node.isRequired,
  }),
]);

export const fnProp = PropTypes.func.isRequired;
export const amountProp = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);
export const numberProp = PropTypes.string;
export const elementProp = PropTypes.object;
export const errorProp = PropTypes.any;

export const historyProp = PropTypes.shape({
  replace: fnProp,
  push: fnProp,
}).isRequired;

export const inputTypeProp = PropTypes.oneOf(['text', 'tel']);

export const currencyProp = PropTypes.string;

export const coinCurrencyProp = PropTypes.oneOf([
  'BTC',
  'XBT',
  'LTC',
  'ETH',
  'DASH',
  'DOGE',
  'LNBC',
  'LNLTC',
]);

export const paymentModeProp = PropTypes.oneOf([
  'dashboard',
  'bitcoin',
  'litecoin',
  'ethereum',
  'dogecoin',
  'dash',
  'button',
  'lightning',
  'lightning-ltc',
  'coinbase',
  'localbitcoins',
]);

export const coinPageProp = PropTypes.oneOf([
  'bitcoin',
  'litecoin',
  'dash',
  'lightning',
  'dogecoin',
  false,
]);

export const configProps = {
  // User data
  defaultNumber: numberProp,
  userAccountBalance: amountProp,
  // userEmail: PropTypes.string,

  // Payment
  // showBTCAddress: PropTypes.bool,
  billingCurrency: currencyProp,
  requireAccountBalance: PropTypes.bool,

  // Receipt
  // sendEmail: PropTypes.bool,
  // sendSMS: PropTypes.bool,

  // Widget appearance
  showInstructions: PropTypes.bool,
  showLogo: PropTypes.bool,
  showPoweredBy: PropTypes.bool,
  showFooter: PropTypes.bool,
  isMobile: PropTypes.bool,

  forceOperator: PropTypes.string,

  // Refill history
  // refillHistory: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     number: numberProp,
  //     operator: operatorProp,
  //   })
  // ),

  onExternalUrl: PropTypes.func,

  coin: coinPageProp,
};

export const configProp = PropTypes.shape(configProps);

export const rangeProp = PropTypes.shape({
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  userPriceRate: PropTypes.number,
});

export const packageProp = PropTypes.shape({
  value: amountProp,
});

export const packagesProp = PropTypes.arrayOf(packageProp);

export const operatorProp = PropTypes.shape({
  type: PropTypes.string,
  packages: packagesProp,
  isRanged: PropTypes.bool,
  range: rangeProp,
  currency: currencyProp,
  extraInfo: PropTypes.string,
  logoImage: PropTypes.string,
  name: PropTypes.string,
  slug: PropTypes.string,
});

export const operatorResultProp = PropTypes.shape({
  isLoading: PropTypes.bool,
  result: operatorProp,
  error: errorProp,
});

export const operatorsProp = PropTypes.object;

export const countryProp = PropTypes.shape({
  name: PropTypes.string,
  alpha2: PropTypes.string,
  operators: operatorsProp,
});

export const countriesProp = PropTypes.arrayOf(countryProp);

export const paymentStatusProp = PropTypes.shape({
  message: PropTypes.string,
  status: PropTypes.string,
  failureData: PropTypes.object,
});

export const paymentProps = {
  address: PropTypes.string,
  altcoinCode: coinCurrencyProp,
  altcoinPrice: amountProp,
  title: PropTypes.string,
  description: PropTypes.any,
  icon: PropTypes.node,
  requireAccountBalance: PropTypes.bool,
  paymentMode: paymentModeProp,
  altBasePrice: amountProp,
  satoshiPrice: amountProp,
};

export const paymentProp = PropTypes.shape(paymentProps);

export const paymentsProp = PropTypes.arrayOf(paymentProp);

export const orderOptionsProp = PropTypes.shape({
  email: PropTypes.string,
  sendEmail: PropTypes.bool,
  sendSMS: PropTypes.bool,
  refundAddress: PropTypes.string,
});

export const orderProp = PropTypes.shape({
  id: PropTypes.string,
  orderId: PropTypes.string,
  payment: paymentProp,
  btcPrice: amountProp,
  itemDesc: PropTypes.string,
  expirationTime: PropTypes.number,
  expired: PropTypes.bool,
  needRefund: PropTypes.bool,
  refunded: PropTypes.bool,
});

export const orderResultProp = PropTypes.shape({
  result: orderProp,
});

export const providerProp = PropTypes.shape({});

export const providersProp = PropTypes.arrayOf(providerProp);

export const numberLookupProp = PropTypes.shape({
  operator: operatorProp,
});

export const rowProps = {
  operatorProps: PropTypes.object,
  isActive: PropTypes.bool,
  icon: PropTypes.node,
  content: PropTypes.node,
};

export const recentNumberProp = PropTypes.shape({
  operator: PropTypes.string,
  number: numberProp,
});

export const recentNumbersProp = PropTypes.arrayOf(recentNumberProp);

export const affordProps = PropTypes.shape({
  amount: amountProp,
  btcPrice: amountProp,
  accountBalance: amountProp,
});

export const inventoryProp = PropTypes.shape({
  result: PropTypes.object,
});

export const emailProp = PropTypes.shape({
  valid: PropTypes.bool,
  value: PropTypes.string,
  error: errorProp,
});

export const deviceInfoProp = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  is: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    desktop: PropTypes.bool,
  }).isRequired,
  lessThan: PropTypes.shape({ mobile: PropTypes.bool, tablet: PropTypes.bool })
    .isRequired,
  greaterThan: PropTypes.shape({
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
  }).isRequired,
  deviceType: PropTypes.oneOf(['ios', 'android']),
}).isRequired;

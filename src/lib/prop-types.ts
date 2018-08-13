interface TranslationObject {
  id: string;
  children: string;
}

export type TransProp = TranslationObject | any;

export interface PaymentButton {
  title: TransProp;
  description: TransProp;
  icon: any;
  paymentMode: PaymentMode;
  color?: string;
  notice?: string;
  canAfford?: (o: { btcPrice: Amount; price: Amount }) => boolean;
  paymentModeOptions?: {
    title: TransProp;
    callback: (order: Order) => void;
  };
}

export type Amount = string | number;
export type Number = string;
export type Element = any;
export type ErrorProp = any;
export type Recipient = RecipientType;

export interface CountryProp {
  name: string;
  alpha2: string;
  operators: Operator[];
}

export type InputType = 'text' | 'tel';

export type Currency = string;
export type BillingCurrency = 'XBT' | 'EUR' | 'USD';
export type RecipientType = 'phone_number' | 'none' | 'email' | 'username';

export type CoinCurrency =
  | 'BTC'
  | 'XBT'
  | 'LTC'
  | 'ETH'
  | 'DASH'
  | 'DOGE'
  | 'LNBC'
  | 'LNLTC';

export type PaymentMode =
  | 'dashboard'
  | 'bitcoin'
  | 'litecoin'
  | 'ethereum'
  | 'dogecoin'
  | 'dash'
  | 'button'
  | 'lightning'
  | 'lightning-ltc'
  | 'coinbase'
  | 'localbitcoins';

export type CoinPage =
  | boolean
  | 'bitcoin'
  | 'litecoin'
  | 'ethereum'
  | 'dash'
  | 'lightning'
  | 'dogecoin';

export interface Config {
  // User data
  defaultNumber: Recipient;
  userAccountBalance: Amount;
  // userEmail: PropTypes.string,

  // Payment
  // showBTCAddress: PropTypes.bool,
  billingCurrency: BillingCurrency;
  requireAccountBalance: boolean;

  // Receipt
  // sendEmail: PropTypes.bool,
  // sendSMS: PropTypes.bool,

  // Widget appearance
  showInstructions: boolean;
  showLogo: boolean;
  showPoweredBy: boolean;
  showFooter: boolean;
  isMobile: boolean;

  forceOperator: string;

  orderOptions: OrderOptions;

  paymentButtons: PaymentButton[];

  // Refill history
  // refillHistory: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     number: numberProp,
  //     operator: operatorProp,
  //   })
  // ),

  onExternalUrl: (uri) => void;

  coin: CoinPage;
}

export interface RangeProp {
  min: number;
  max: number;
  step: number;
  userPriceRate: number;
}

export interface Package {
  value: Amount;
}

export interface Operator {
  type: string;
  packages: any[];
  isRanged: boolean;
  range: RangeProp;
  currency: Currency;
  extraInfo: string;
  logoImage: string;
  isPinBased: boolean;
  name: string;
  slug: string;
  recipientType: RecipientType;
}

export interface Result<T> {
  isLoading: boolean;
  result?: T;
  error?: ErrorProp;
}

export type OperatorResult = Result<Operator>;

export interface PaymentStatus {
  message: string;
  status: string;
  failureData: any;
  deliveryData?: any;
}

export interface Payment {
  address: string;
  altcoinCode: CoinCurrency;
  altcoinAddress: string;
  altcoinPrice: Amount;
  title: string | TransProp;
  description: any;
  icon: JSX.Element;
  requireAccountBalance: boolean;
  paymentMode: PaymentMode;
  paymentModeOptions: {
    title: string | TransProp;
    callback: (...args) => any;
  };
  altBasePrice: Amount;
  satoshiPrice: Amount;
}

export interface OrderOptions {
  email: string;
  sendEmail: boolean;
  sendSMS: boolean;
  refundAddress: string;
}

export interface Order {
  accessToken: string;
  allowRetry: boolean;
  btcPrice: Amount;
  coinCurrency: CoinCurrency;
  country: string;
  currency: Currency;
  delivered: boolean;
  email: string;
  eurPrice: Amount;
  expirationTime: number;
  expired: boolean;
  id: string;
  invoiceTime: number;
  itemDesc: string;
  merchant_price: Amount;
  needRefund: boolean;
  paid: boolean;
  number: string;
  operator: string;
  operatorResponse: string;
  operatorSlug: string;
  orderId: string;
  paidAmount: Amount;
  partialPayment: boolean;
  payment: Payment;
  paymentMethod: PaymentMode;
  paymentReceived: boolean;
  price: Amount;
  priciness: Amount;
  refunded: boolean;
  satoshiPrice: Amount;
  sent: boolean;
  summary: string;
  usdPrice: Amount;
  value: Amount;
  valuePackage: Amount;
  willRetry: boolean;
  errorMessage?: string;
}

export type OrderResult = Result<Order>;

export type ProviderObject = any;

export interface NumberLookup {
  operator: Operator;
  altOperators: any[];
}

export type NumberLookupResult = Result<NumberLookup>;

export interface RecentNumber {
  operator: string;
  number: RecipientType;
}

export interface AffordProps {
  amount: Amount;
  btcPrice: Amount;
  accountBalance: Amount;
}

export interface Inventory {
  result?: any;
}

export interface Email {
  valid: boolean;
  value?: string;
  error?: any;
}

type DeviceType = 'ios' | 'android';

interface Devices {
  tablet: boolean;
  mobile: boolean;
}

export interface DeviceInfoProps {
  width: number;
  height: number;
  is: Devices & {
    desktop: boolean;
  };
  lessThan: Devices;
  greaterThan: Devices;
  deviceType: DeviceType;
}

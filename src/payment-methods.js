import { PUSHER_API_KEY } from './constants';

import {
  BitcoinIcon,
  LitecoinIcon,
  DogecoinIcon,
  DashIcon,
  LocalBitcoinsIcon,
  CoinbaseIcon,
  EthereumIcon,
} from './assets';

const baseUrl =
  process.env.NODE_ENV === 'development' ? '/api' : 'https://api.bitrefill.com';

function openWindow(method, order) {
  const win = window.open(`${baseUrl}/widget/${method}?order=${order.id}`);

  import(/* webpackChunkName: "module__react-pusher" */ '@bitrefill/react-pusher').then(
    ({ getPusherClient }) => {
      const pusher = getPusherClient(PUSHER_API_KEY);
      if (!pusher) return console.error('No Pusher instance');

      const channel = pusher.subscribe(`${order.id}-${order.payment.address}`);

      [
        'paid',
        'confirmed',
        'partial',
        'failed',
        'delivered',
        'expired',
        'payment_error',
      ].forEach(e =>
        channel.bind(e, () => {
          win.close();
          pusher.disconnect();
        })
      );
    }
  );
}

export default function getPaymentMethods() {
  return [
    {
      title: 'Bitcoin Transaction',
      description: 'Delivery after one confirmation',
      icon: BitcoinIcon,
      requireAccountBalance: false,
      paymentMode: 'bitcoin',
    },
    {
      title: 'Litecoin Transaction',
      description: 'Delivery after one confirmation',
      icon: LitecoinIcon,
      requireAccountBalance: false,
      paymentMode: 'litecoin',
    },
    {
      title: 'Ether Transaction',
      description: 'Delivery after one confirmation',
      icon: EthereumIcon,
      requireAccountBalance: false,
      paymentMode: 'ethereum',
    },
    {
      title: 'Lightning BTC Payment',
      description: 'Low fees, delivery after payment sent usually instant',
      notice: 'Max 0.0429 BTC',
      icon: BitcoinIcon,
      requireAccountBalance: false,
      paymentMode: 'lightning',
    },
    {
      title: 'Coinbase',
      description: 'Pay with your Coinbase account',
      icon: CoinbaseIcon,
      requireAccountBalance: false,
      paymentMode: 'coinbase',
      paymentModeOptions: {
        title: 'Pay with Coinbase',
        callback: order => openWindow('coinbase', order),
      },
    },
    {
      title: 'Dogecoin Transaction',
      description: 'Delivery after one confirmation',
      icon: DogecoinIcon,
      requireAccountBalance: false,
      paymentMode: 'dogecoin',
    },
    {
      title: 'Dash Transaction',
      description: 'InstantSend',
      icon: DashIcon,
      requireAccountBalance: false,
      paymentMode: 'dash',
    },
    {
      title: 'LocalBitcoins',
      description: 'Pay with your LocalBitcoins account',
      notice: 'Minimum 0.001 BTC',
      icon: LocalBitcoinsIcon,
      requireAccountBalance: false,
      paymentMode: 'localbitcoins',
      paymentModeOptions: {
        title: 'Pay with LocalBitcoins',
        callback: order => openWindow('localbitcoins', order),
      },
    },
  ];
}

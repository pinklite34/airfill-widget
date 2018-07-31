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
      title: 'Bitcoin (BTC)',
      description:
        'Regular Bitcoin transaction. Most transactions are accepted immediately, or after maximum one confirmation.',
      icon: BitcoinIcon,
      requireAccountBalance: false,
      paymentMode: 'bitcoin',
    },
    {
      title: 'Lightning (BTC)',
      description: 'Instant delivery, minimal fees.',
      notice: 'Max 0.0429 BTC',
      icon: BitcoinIcon,
      requireAccountBalance: false,
      paymentMode: 'lightning',
    },
    {
      title: 'Litecoin (LTC)',
      description:
        'Regular Litecoin transaction. Most transactions are accepted immediately, or after maximum one confirmation.',
      icon: LitecoinIcon,
      requireAccountBalance: false,
      paymentMode: 'litecoin',
    },
    {
      title: 'Ethereum (ETH)',
      description: 'Delivery after one confirmation.',
      icon: EthereumIcon,
      requireAccountBalance: false,
      paymentMode: 'ethereum',
    },
    {
      title: 'Dogecoin',
      description:
        'Regular Dogecoin transaction. Delivery after one confirmation.',
      icon: DogecoinIcon,
      requireAccountBalance: false,
      paymentMode: 'dogecoin',
    },
    {
      title: 'DASH',
      description:
        'Regular Dash transaction. Transactions are accepted after maximum one confirmation, or instantly using InstantSend.',
      icon: DashIcon,
      requireAccountBalance: false,
      paymentMode: 'dash',
    },
    {
      title: 'Coinbase',
      description:
        'Pay directly with your Coinbase account in BTC, LTC, BCH or ETH. Instant delivery and no fees.',
      icon: CoinbaseIcon,
      requireAccountBalance: false,
      paymentMode: 'coinbase',
      paymentModeOptions: {
        title: 'Pay with Coinbase',
        callback: order => openWindow('coinbase', order),
      },
    },
    {
      title: 'LocalBitcoins',
      description:
        'Pay with your LocalBitcoins balance. Instant delivery and no fees.',
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

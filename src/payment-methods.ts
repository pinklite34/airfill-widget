import { PaymentButton } from './lib/prop-types';

import { PUSHER_API_KEY } from '../constants';
import {
  BitcoinIcon,
  CoinbaseIcon,
  DashIcon,
  DogecoinIcon,
  EthereumIcon,
  LitecoinIcon,
  LocalBitcoinsIcon,
} from './assets';
import { getPreOrderProps } from './lib/currency-helpers';

const baseUrl =
  process.env.NODE_ENV === 'development' ? '/api' : 'https://api.bitrefill.com';

function openWindow(method, order) {
  const win = window.open(`${baseUrl}/widget/${method}?order=${order.id}`);

  import(/* webpackChunkName: "module__react-pusher" */ '@bitrefill/react-pusher').then(
    ({ getPusherClient }) => {
      const pusher = getPusherClient(PUSHER_API_KEY, {});
      if (!pusher) {
        return console.error('No Pusher instance');
      }

      const channel = pusher.subscribe(`${order.id}-${order.payment.address}`);

      [
        'paid',
        'confirmed',
        'partial',
        'failed',
        'delivered',
        'expired',
        'payment_error',
        '2fa_required',
      ].forEach(e =>
        channel.bind(e, () => {
          win.close();
        })
      );
    }
  );
}

export function canAfford(method, operator, amount, billingCurrency) {
  return method.canAfford(
    getPreOrderProps({
      operator: operator.result,
      billingCurrency,
      amount,
    })
  );
}

export default function getPaymentMethods(): PaymentButton[] {
  return [
    {
      title: {
        id: 'paymentmethod.bitcoin.title',
        children: 'Bitcoin (BTC)',
      },
      description: {
        id: 'paymentmethod.bitcoin.subtitle',
        children:
          'Regular Bitcoin transaction. Most transactions are accepted immediately, or after maximum one confirmation.',
      },
      icon: BitcoinIcon,
      paymentMode: 'bitcoin',
      color: '#e46718',
    },
    {
      title: {
        id: 'paymentmethod.lightning.title',
        children: 'Lightning (BTC)',
      },
      description: {
        id: 'paymentmethod.lightning.subtitle',
        children: 'Instant delivery, minimal fees.',
      },
      notice: 'Max 0.0429 BTC',
      icon: BitcoinIcon,
      paymentMode: 'lightning',
      color: '#e48718',
      canAfford: ({ btcPrice }) => btcPrice < 0.04294967,
    },
    {
      title: {
        id: 'paymentmethod.litecoin.title',
        children: 'Litecoin (LTC)',
      },
      description: {
        id: 'paymentmethod.litecoin.subtitle',
        children:
          'Regular Litecoin transaction. Most transactions are accepted immediately, or after maximum one confirmation.',
      },
      icon: LitecoinIcon,
      paymentMode: 'litecoin',
    },
    {
      title: {
        id: 'paymentmethod.ethereum.title',
        children: 'Ethereum (ETH)',
      },
      description: {
        id: 'paymentmethod.ethereum.subtitle',
        children: 'Delivery after one confirmation.',
      },
      icon: EthereumIcon,
      paymentMode: 'ethereum',
      color: '#5770d0',
    },
    {
      title: {
        id: 'paymentmethod.dogecoin.title',
        children: 'Dogecoin',
      },
      description: {
        id: 'paymentmethod.dogecoin.subtitle',
        children:
          'Regular Dogecoin transaction. Delivery after one confirmation.',
      },
      icon: DogecoinIcon,
      paymentMode: 'dogecoin',
      color: '#b99e31',
    },
    {
      title: {
        id: 'paymentmethod.dash.title',
        children: 'DASH',
      },
      description: {
        id: 'paymentmethod.dash.subtitle',
        children:
          'Regular Dash transaction. Transactions are accepted after maximum one confirmation, or instantly using InstantSend.',
      },
      icon: DashIcon,
      paymentMode: 'dash',
      color: '#008de4',
    },
    {
      title: {
        id: 'paymentmethod.coinbase.title',
        children: 'Coinbase',
      },
      description: {
        id: 'paymentmethod.coinbase.subtitle',
        children:
          'Pay directly with your Coinbase account in BTC, LTC, BCH or ETH. Instant delivery and no fees.',
      },
      icon: CoinbaseIcon,
      paymentMode: 'coinbase',
      paymentModeOptions: {
        title: {
          id: 'paymentmethod.coinbase.pay',
          children: 'Pay with Coinbase',
        },
        callback: order => openWindow('coinbase', order),
      },
    },
    {
      title: {
        id: 'paymentmethod.localbitcoins.title',
        children: 'LocalBitcoins',
      },
      description: {
        id: 'paymentmethod.localbitcoins.subtitle',
        children:
          'Pay with your LocalBitcoins balance. Instant delivery and no fees.',
      },
      notice: 'Minimum 0.001 BTC',
      icon: LocalBitcoinsIcon,
      paymentMode: 'localbitcoins',
      paymentModeOptions: {
        title: {
          id: 'paymentmethod.localbitcoins.pay',
          children: 'Pay with LocalBitcoins',
        },
        callback: order => openWindow('localbitcoins', order),
      },
      canAfford: ({ btcPrice }) => btcPrice > 0.001,
    },
  ];
}

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { PUSHER_API_KEY } from './constants';

import Coinbase from './coinbase.svg';
import LocalBitcoins from './localbitcoins.png';

const baseUrl =
  process.env.NODE_ENV === 'development' ? '/api' : 'https://api.bitrefill.com';

const styles = {
  textIcon: css({
    fontSize: '12px !important',
  }),
  subtitle: css({
    fontSize: '12px !important',
  }),
};

function openWindow(method, order) {
  const win = window.open(`${baseUrl}/widget/${method}?order=${order.id}`);

  import(/* webpackChunkName: "react-pusher" */ '@bitrefill/react-pusher').then(
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

function PaymentMethodTextIcon({ children }) {
  return <p {...styles.textIcon}>{children}</p>;
}

PaymentMethodTextIcon.propTypes = {
  children: PropTypes.string.isRequired,
};

function PaymentMethodDescription({ text, subtext }) {
  return (
    <span>
      {text}
      <br />
      <span {...styles.subtitle}>{subtext}</span>
    </span>
  );
}

PaymentMethodDescription.propTypes = {
  text: PropTypes.string.isRequired,
  subtext: PropTypes.string,
};

export default function getPaymentMethods({ currency, dispatch, ...props }) {
  return [
    {
      title: 'Bitcoin Transaction',
      description: 'Delivery after one confirmation',
      icon: <PaymentMethodTextIcon>{'BTC'}</PaymentMethodTextIcon>,
      requireAccountBalance: false,
      paymentMode: 'bitcoin',
    },
    {
      title: 'Litecoin Transaction',
      description: 'Delivery after one confirmation',
      icon: <PaymentMethodTextIcon>{'LTC'}</PaymentMethodTextIcon>,
      requireAccountBalance: false,
      paymentMode: 'litecoin',
    },
    {
      title: 'Ether Transaction',
      description: 'Currently offline', // 'Delivery after one confirmation',
      icon: <PaymentMethodTextIcon>{'ETH'}</PaymentMethodTextIcon>,
      requireAccountBalance: false,
      paymentMode: 'ethereum',
      disabled: true,
    },
    {
      title: 'Dogecoin Transaction',
      description: 'Delivery after one confirmation',
      icon: <PaymentMethodTextIcon>{'DOGE'}</PaymentMethodTextIcon>,
      requireAccountBalance: false,
      paymentMode: 'dogecoin',
    },
    {
      title: 'Dash Transaction',
      description: 'InstantSend',
      icon: <PaymentMethodTextIcon>{'DASH'}</PaymentMethodTextIcon>,
      requireAccountBalance: false,
      paymentMode: 'dash',
    },
    {
      title: 'Lightning BTC Payment',
      description: (
        <PaymentMethodDescription
          text="Low fees, delivery after payment sent usually instant"
          subtext="Max 0.0429 BTC"
        />
      ),
      icon: <PaymentMethodTextIcon>{'BTCL'}</PaymentMethodTextIcon>,
      requireAccountBalance: false,
      paymentMode: 'lightning',
    },
    {
      title: 'Lightning LTC Payment',
      description: (
        <PaymentMethodDescription
          text="Low fees, delivery after payment sent usually instant"
          subtext="Max 0.0429 LTC"
        />
      ),
      icon: <PaymentMethodTextIcon>{'LTCL'}</PaymentMethodTextIcon>,
      requireAccountBalance: false,
      paymentMode: 'lightning-ltc',
    },
    {
      title: 'Coinbase',
      description: 'Pay with your Coinbase account',
      icon: <Coinbase />,
      requireAccountBalance: false,
      paymentMode: 'coinbase',
      paymentModeOptions: {
        title: 'Pay with Coinbase',
        callback: order => openWindow('coinbase', order),
      },
    },
    {
      title: 'LocalBitcoins',
      description: (
        <PaymentMethodDescription
          text="Pay with your LocalBitcoins account"
          subtext="Minimum 0.001 BTC"
        />
      ),
      icon: <img src={LocalBitcoins} />,
      requireAccountBalance: false,
      paymentMode: 'localbitcoins',
      paymentModeOptions: {
        title: 'Pay with LocalBitcoins',
        callback: order => openWindow('localbitcoins', order),
      },
    },
  ];
}

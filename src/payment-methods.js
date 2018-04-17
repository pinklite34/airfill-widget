import React from 'react';
import Coinbase from './coinbase.svg';
import LocalBitcoins from './localbitcoins.png';

import PropTypes from 'prop-types';
import { css } from 'glamor';

import Pusher from 'pusher-js';

const styles = {
  textIcon: css({
    fontSize: '12px !important',
  }),
  subtitle: css({
    fontSize: '12px !important',
  }),
};

const TextIcon = ({ children }) => <p {...styles.textIcon}>{children}</p>;

TextIcon.propTypes = {
  children: PropTypes.string.isRequired,
};

const openWindow = (method, order) => {
  const win = window.open(
    `${
      process.env.NODE_ENV === 'development'
        ? '/api'
        : 'https://api.bitrefill.com'
    }/widget/${method}?order=${order.id}`
  );

  const pusher = new Pusher('0837b617cfe786c32a91');
  const channel = pusher.subscribe(order.id + '-' + order.payment.address);

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
};

const Description = ({ text, subtext }) => (
  <span>
    {text}
    <br />
    <span {...styles.subtitle}>{subtext}</span>
  </span>
);

Description.propTypes = {
  text: PropTypes.string.isRequired,
  subtext: PropTypes.string,
};

export default ({ currency, dispatch, ...props }) => [
  {
    title: 'Bitcoin Transaction',
    description: 'Delivery after one confirmation',
    icon: <TextIcon>BTC</TextIcon>,
    requireAccountBalance: false,
    paymentMode: 'bitcoin',
  },
  {
    title: 'Litecoin Transaction',
    description: 'Delivery after one confirmation',
    icon: <TextIcon>LTC</TextIcon>,
    requireAccountBalance: false,
    paymentMode: 'litecoin',
  },
  {
    title: 'Dogecoin Transaction',
    description: 'Delivery after one confirmation',
    icon: <TextIcon>DOGE</TextIcon>,
    requireAccountBalance: false,
    paymentMode: 'dogecoin',
  },
  {
    title: 'Dash Transaction',
    description: 'InstantSend',
    icon: <TextIcon>DASH</TextIcon>,
    requireAccountBalance: false,
    paymentMode: 'dash',
  },
  {
    title: 'Lightning BTC Payment',
    description: (
      <Description
        text="Low fees, delivery after payment sent usually instant"
        subtext="Max 0.0429 BTC"
      />
    ),
    icon: <TextIcon>BTCL</TextIcon>,
    requireAccountBalance: false,
    paymentMode: 'lightning',
  },
  {
    title: 'Lightning LTC Payment',
    description: (
      <Description
        text="Low fees, delivery after payment sent usually instant"
        subtext="Max 0.0429 LTC"
      />
    ),
    icon: <TextIcon>LTCL</TextIcon>,
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
      <Description
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

import PropTypes from 'prop-types';
import React from 'react';

import BitcoinAddress from '../UI/BitcoinAddress';

const PartialPayment = ({ order, paymentStatus }) => {
  const paidAmount = Math.round(paymentStatus.paidAmount / 10000) / 10000;
  const remainingAmount =
    Math.ceil((order.satoshiPrice - paymentStatus.paidAmount) / 10000) / 10000;

  return (
    <div>
      <h3>Partial payment detected</h3>
      <p>
        We have received a partial payment from you. You paid{' '}
        <strong>{paidAmount} BTC</strong>, but the invoice was for{' '}
        <strong>{order.btcPrice} BTC</strong>. Please send the remaining{' '}
        <strong>{remainingAmount} BTC</strong> to the address below:
      </p>
      <BitcoinAddress address={order.payment.address} />
      <p>
        Need help? Send us an email at{' '}
        <a
          href={`mailto:support@bitrefill.com?subject=Partial%20payment&body=Order%20ID:%20${
            order.orderId
          }`}
        >
          support@bitrefill.com
        </a>.
      </p>
    </div>
  );
};

PartialPayment.propTypes = {
  order: PropTypes.object.isRequired,
  paymentStatus: PropTypes.object.isRequired,
};

export default PartialPayment;

import React from 'react';
import PropTypes from 'prop-types';

import { orderProp } from '../../lib/prop-types';

import Text from '../UI/Text';

export default function RefillFailedInfo({ refundAddress, needRefund, order }) {
  return !refundAddress && (needRefund === false || order.refunded === true) ? (
    <Text type="p" id="order.failed.info.check">
      We have sent you an automatic refund. Please make sure your details are
      correct and try again!
    </Text>
  ) : refundAddress ? (
    <Text type="p" id="order.failed.info.soon">
      We have sent you an automatic refund. You should receive it within a few
      minutes.
    </Text>
  ) : (
    <Text type="p" id="order.failed.info.support">
      Please use the button below to contact our support so that we can send you
      a refund.
    </Text>
  );
}

RefillFailedInfo.propTypes = {
  order: orderProp,
  refundAddress: PropTypes.string,
  needRefund: PropTypes.bool,
};

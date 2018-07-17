import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { orderProp, fnProp } from '../../lib/prop-types';

import Button from '../UI/Button';
import Link from '../UI/Link';
import Text from '../UI/Text';

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

export default function RefillFailedAction({
  refundAddress,
  needRefund,
  order,
  mailTo,
  onReset,
}) {
  return !refundAddress && (needRefund === false || order.refunded === true) ? (
    <StyledButton
      onClick={onReset}
      text={{ id: 'button.sendrefill', children: 'Send another refill' }}
    />
  ) : refundAddress ? (
    <Text type="p" size="14px" id="order.failed.refund">
      <Link href={`https://live.blockcypher.com/btc/address/${refundAddress}/`}>
        Click here to see how it&apos;s going
      </Link>{' '}
      or <Link href={mailTo}>contact support@bitefill.com</Link>.
    </Text>
  ) : (
    <StyledButton
      href={mailTo}
      text={{ id: 'button.contactsupport', children: 'Contact Support' }}
    />
  );
}

RefillFailedAction.propTypes = {
  order: orderProp,
  refundAddress: PropTypes.string,
  onReset: fnProp,
  needRefund: PropTypes.bool,
  mailTo: PropTypes.string,
};

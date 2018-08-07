import React, { Fragment } from 'react';
import Input from 'material-ui/Input';

import { orderProp, fnProp } from '../../lib/prop-types';

import PaymentLayout from './PaymentLayout';
import OrderHeader from '../UI/OrderHeader';
import Button from '../UI/Button';
import Info from '../UI/info.svg';
import Text from '../UI/Text';

import { fetch } from '../../lib/api-client';

export default class PaymentTwoFactor extends React.Component {
  state = {
    code: '',
  };

  onClick = () =>
    fetch(
      `/coinbase/2fa?order=${this.props.order.id}&twoFactorCode=${
        this.state.code
      }`
    )
      .then(response => console.log(response))
      .catch(error => console.error(error));

  render() {
    const { order } = this.props;
    const { code } = this.state;

    return (
      <Fragment>
        <OrderHeader
          order={order}
          title={{ id: 'order.2farequired.title', children: '2FA Required' }}
          subtitle={{
            id: 'order.2farequired.subtitle',
            children: 'We need your Coinbase 2FA code to complete the payment',
          }}
          icon={<Info tight />}
        />

        <PaymentLayout {...this.props}>
          <Text>Enter 2-step verification code:</Text>
          <Input
            type="text"
            id="2fa"
            required
            onChange={e => this.setState({ code: e.target.value.trim() })}
            value={code}
          />

          <Button
            margin="12px 0 0"
            onClick={this.onClick}
            text={{
              id: 'paymentmethod.coinbase.pay',
              children: 'Pay with Coinbase',
            }}
          />
        </PaymentLayout>
      </Fragment>
    );
  }
}

PaymentTwoFactor.propTypes = {
  order: orderProp,
  onReset: fnProp,
};

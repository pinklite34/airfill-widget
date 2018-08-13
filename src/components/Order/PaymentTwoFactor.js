import Input from 'material-ui/Input';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { fnProp, orderProp } from '../../lib/prop-types';
import Button from '../UI/Button';
import Info from '../UI/info.svg';
import OrderHeader from '../UI/OrderHeader';
import Text from '../UI/Text';
import PaymentLayout from './PaymentLayout';
import { fetch } from '../../lib/api-client';

class PaymentTwoFactor extends React.Component {
  state = {
    code: '',
  };

  onClick = () => {
    const uri = `/coinbase/2fa?order=${this.props.order.id}&twoFactorCode=${
      this.state.code
    }`;
    fetch(uri, {
      method: 'GET',
    })
      .then(e => console.log(e))
      .catch(e => console.error(e));
  };

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
  dispatch: PropTypes.func.isRequired,
  post2faCode: PropTypes.func.isRequired,
};

export default PaymentTwoFactor;

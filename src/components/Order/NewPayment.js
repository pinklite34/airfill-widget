import PropTypes from 'prop-types';
import React from 'react';

import { css } from 'glamor';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';

import { isPhoneNumber, formatDisplayValue } from '../../lib/number-helpers';

import BitcoinAddress from '../UI/BitcoinAddress';
import Plus from './plus.svg';
import Logo from './logo.svg';
import Info from './info.svg';
import OrderHeader from '../UI/OrderHeader';
import PaymentLayout from './PaymentLayout';

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice'
};

const styles = {
  list: css({
    display: 'block',
    '> dt': {
      float: 'left',
      textAlign: 'right',
      width: 120,
      fontWeight: 700,
      marginRight: '24px'
    },
    '> dd': {
      marginBottom: 8
    }
  }),
  paymentMethods: css({
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  }),
  paymentGroup: css({
    flex: 1,
    margin: '0 32px',

    '&:first-child': {
      '&:after, &:before': { display: 'none' }
    },

    '&:before': {
      display: 'block',
      position: 'absolute',
      top: 0,
      bottom: 0,
      marginLeft: -32,
      backgroundColor: 'rgba(0,0,0,0.16)',
      width: '1px',
      content: ' '
    },
    '&:after': {
      display: 'block',
      position: 'absolute',
      top: '50%',
      marginLeft: -38,
      marginTop: '-1em',
      content: 'or',
      backgroundColor: 'hsl(130,5%,99%)',
      padding: '0.5em 0 0.6em',
      lineHeight: 1,
      color: '#999'
    }
  }),
  buttonGroup: css({
    margin: -8
  }),
  button: css({
    margin: 8
  }),
  package: css({
    fontSize: 16,
    color: '#323232',
    fontWeight: 'bold'
  }),
  changeButton: css({
    color: '#3e8fe4 !important',
    fontWeight: 'bold !important'
  }),
  paymentLabel: css({
    fontSize: '12px !important'
  })
};

const labelForNumberType = type =>
  isPhoneNumber(type) ? 'Phone number' : 'Account number';

const PaymentMenu = ({ open, anchorEl, onClick }) => {

  const Item = ({ children, primary, secondary, icon }) => (
    <MenuItem
      open={open}
      onClick={() => onClick(primary)}
    >
      {icon && <ListItemIcon style={{margin: -6}}>{icon}</ListItemIcon>}
      <ListItemText
        primary={primary}
        secondary={secondary}
      />
    </MenuItem>
  );

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
      >
        <Item
          primary="Bitrefill account balance"
          secondary="No fees, instant delivery"
          icon={<Logo />}
        />
        <Item
          primary="Bitcoin Payment"
          secondary="Normal fees, delivery after payment confirmation"
          icon={<p {...styles.paymentLabel}>BTC</p>}
        />
        <Item
          primary="Litecoin Payment"
          secondary="Normal fees, delivery after payment confirmation"
          icon={<p {...styles.paymentLabel}>LTC</p>}
        />
        <Item
          primary="Add external wallet"
          secondary="Pay with Coinbase, Xapo, LocalBitcoin..."
          icon={<Plus />}
        />
      </Menu>
    </div>
  );
}

class NewPayment extends React.Component {

  state = {
    anchorEl: null,
    open: false,
    paymentMethod: 'Account balance'
  };

  openMenu = (e) => this.setState({
    open: true,
    anchorEl: e
  });

  menuClick = (paymentMethod) => {
    this.setState({
      open: false,
      anchorEl: null,
      paymentMethod
    });
  };

  render() {
    const {
      order,
      operator,
      number,
      country,
      accountBalance,
      requireAccountBalance,
      showEmailField,
      showBTCAddress,
      billingCurrency,
      paymentButtons
    } = this.props;

    const billingCurrencyDisplayName =
      billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
    const price = order[valueField[billingCurrency.toLowerCase()]];
    const formattedPrice = price + ' ' + billingCurrencyDisplayName.toUpperCase();
    const canAfford = price <= accountBalance;
    const displayNumber = !operator.noNumber;
    const widgetRequireAccountBalance = requireAccountBalance;

    return (
      <div>
        <PaymentMenu {...this.state} onClick={this.menuClick} />

        <OrderHeader
          order={order}
          title="Payment"
          subtitle="Confirm the details below to purchase your refill"
          icon={<Info/>}
        />

        <PaymentLayout {...this.props}>
          <div>
            <div>
              <p>Pay with</p>
            </div>
            <div>
              {this.state.paymentMethod} <Button {...styles.changeButton} onClick={(event) => this.openMenu(event.currentTarget)}>Change</Button>
            </div>
          </div>

          <div>
            <div/>
            <div {...styles.paymentMethods}>
              {paymentButtons && (
                <div {...styles.paymentGroup} {...styles.buttonGroup}>
                  {paymentButtons.map(
                    ({ title, requireAccountBalance, lowBalanceText, callback }, i) => {
                      // disabled | canAfford | requireAccountBalance | widgetRequireAccountBalance
                      // true     | false     | undefined (!false)    | true
                      // true     | false     | true                  | true
                      // false    | false     | false                 | true
                      // false    | false     | undefined (!false)    | false
                      // true     | false     | true                  | false
                      // false    | false     | false                 | false
                      // false    | true      | any                   | any
                      const disabled =
                        !canAfford &&
                        ((widgetRequireAccountBalance &&
                          requireAccountBalance !== false) ||
                          requireAccountBalance);
                      return [
                        <Button
                          {...styles.button}
                          raised
                          key={title}
                          onClick={() => callback(order)}
                          disabled={disabled}
                          color={i === 0 ? 'primary' : 'default'}
                        >
                          {title}
                        </Button>,
                        disabled ? (
                          <small>
                            {lowBalanceText ||
                              'Your account balance is too low to use this option'}
                          </small>
                        ) : null
                      ];
                    }
                  )}
                </div>
              )}
              {showBTCAddress && (
                <div {...styles.paymentGroup}>
                  <p>
                    Send <i>exactly</i> <strong>{order.btcPrice} BTC</strong> to
                    address:
                  </p>
                  <BitcoinAddress address={order.payment.address} />
                </div>
              )}
            </div>
          </div>
        </PaymentLayout>
      </div>
    );
  }
}

NewPayment.propTypes = {
  order: PropTypes.object.isRequired,
  showBTCAddress: PropTypes.bool.isRequired,
  paymentButtons: PropTypes.array
};

export default NewPayment;

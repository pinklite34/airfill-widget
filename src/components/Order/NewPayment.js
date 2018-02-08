import PropTypes from 'prop-types';
import React from 'react';

import { css } from 'glamor';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';

import { isPhoneNumber, formatDisplayValue } from '../../lib/number-helpers';

import BitcoinAddress from '../UI/BitcoinAddress';
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
    fontWeight: 'bold !important',
    marginLeft: '12px'
  }),
  divider: css({
    border: 0,
    height: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
  })
};

const labelForNumberType = type =>
  isPhoneNumber(type) ? 'Phone number' : 'Account number';

const Divider = () => (
  <hr {...styles.divider}/>
);

const PaymentMenu = ({ open, anchorEl, paymentButtons, onClick }) => {

  const Item = props => {
    let {
      title,
      description,
      icon
    } = props;

    if (typeof icon === 'string') {
      icon = <img src={icon}/>
    }

    /*const disabled =
      !canAfford &&
      ((widgetRequireAccountBalance &&
        requireAccountBalance !== false) ||
        requireAccountBalance);
*/
    return (
      <MenuItem
        open={open}
        onClick={() => onClick(props)}
      >
        {icon && <ListItemIcon style={{margin: -6}}>{icon}</ListItemIcon>}
        <ListItemText
          primary={title}
          secondary={description}
        />
      </MenuItem>
    );
  };

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
      >
        {paymentButtons && paymentButtons.map((props, index) => (
          <div key={index}>
            <Item {...props} />
            {index < paymentButtons.length - 1 && <Divider/>}
          </div>
        ))}
      </Menu>
    </div>
  );
}

class NewPayment extends React.Component {

  state = {
    anchorEl: null,
    open: false,
    paymentMethod: {
      title: 'Unknown',
      paymentModeOptions: {
        title: 'Unknown',
        callback: console.log('unknown')
      }
    }
  };

  openMenu = (e) => this.setState({
    open: true,
    anchorEl: e
  });

  menuClick = (button) => {
    console.log("clicked", button);
    this.setState({
      open: false,
      anchorEl: null,
      paymentMethod: button
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

    const method = this.state.paymentMethod;

    return (
      <div>
        <PaymentMenu {...this.state} paymentButtons={paymentButtons} onClick={this.menuClick} />

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
              {this.state.paymentMethod.title} <Button {...styles.changeButton} onClick={(event) => this.openMenu(event.currentTarget)}>Change</Button>
            </div>
          </div>
          <div>
            <div/>
            <div>
              {this.state.paymentMethod.paymentMode === 'button' &&
                <Button raised color="primary" onClick={() => method.paymentModeOptions.callback(order)}>
                  {method.paymentModeOptions.title}
                </Button>
              }
            </div>
          </div>
          {/*showBTCAddress && (
            <div {...styles.paymentGroup}>
              <p>
                Send <i>exactly</i> <strong>{order.btcPrice} BTC</strong> to
                address:
              </p>
              <BitcoinAddress address={order.payment.address} />
            </div>
          )*/}
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

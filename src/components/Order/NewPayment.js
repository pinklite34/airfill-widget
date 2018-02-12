import PropTypes from 'prop-types';
import React from 'react';

import { css } from 'glamor';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemText, ListItemIcon } from 'material-ui/List';

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
  }),
  container: css({
    display: 'flex',
    flexDirection: 'row'
  }),
  left: css({
    flex: 1
  }),
  right: css({
    flex: 1,
    marginRight: '12px',
    '& img': {
      float: 'right'
    }
  })
};

const Divider = () => (
  <hr {...styles.divider}/>
);

const PaymentMenu = props => {
  const {
    open,
    anchorEl,
    paymentButtons,
    onClick
  } = props;

  const Item = props => {
    let {
      title,
      description,
      icon,
      order,
      billingCurrency,
      accountBalance,
      operator,
      requireAccountBalance
    } = props;

    if (typeof icon === 'string') {
      icon = <img src={icon}/>
    }

    const price = order[valueField[billingCurrency.toLowerCase()]];
    const canAfford = price <= accountBalance;
    const displayNumber = !operator.noNumber;
    const widgetRequireAccountBalance = requireAccountBalance;

    const disabled =
      !canAfford &&
      ((widgetRequireAccountBalance &&
        requireAccountBalance !== false) ||
        requireAccountBalance);

    return (
      <MenuItem
        open={open}
        onClick={() => onClick(props)}
        disabled={disabled}
      >
        {icon && <ListItemIcon style={{margin: 0}}>{icon}</ListItemIcon>}
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
        {paymentButtons && paymentButtons.map((options, index) => (
          <div key={index}>
            <Item {...options} {...props} />
            {index < paymentButtons.length - 1 && <Divider/>}
          </div>
        ))}
      </Menu>
    </div>
  );
}

class NewPayment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false,
      paymentMethod: props.paymentButtons[0]
    };
  }

  openMenu = (e) => this.setState({
    open: true,
    anchorEl: e
  });

  menuClick = (button) => {
    // if callback is set, then it's an old payment button
    // keep this for backwards compability
    if (button.callback) {
      button.paymentModeOptions = {
        title: button.title,
        callback: button.callback
      };
    }

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

    const method = this.state.paymentMethod;

    return (
      <div>
        <PaymentMenu {...this.props} {...this.state} paymentButtons={paymentButtons} onClick={this.menuClick} />

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
              {method.paymentMode === 'button' && (
                <Button raised color="primary" onClick={() => method.paymentModeOptions.callback(order)}>
                  {method.paymentModeOptions.title}
                </Button>
              )}
              {method.paymentMode === 'btc' && (
                <div {...styles.container}>
                  <div {...styles.left}>
                    Send <i>exactly</i> <strong>{order.btcPrice} BTC</strong> to this address:
                    <BitcoinAddress address={order.payment.address} />
                    <br/>
                    <br/>
                    <Button {...styles.bottomButton} raised color="primary" onClick={() => window.location.href = order.payment.BIP21}>
                      Open wallet
                    </Button>
                  </div>
                  <div {...styles.right}>
                    <img
                      src="data:image/png;base64,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"
                      alt="QR code"
                    />
                  </div>
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

import PropTypes from 'prop-types'
import React from 'react'

import { css } from 'glamor'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import { ListItemText, ListItemIcon } from 'material-ui/List'

import BitcoinAddress from '../UI/BitcoinAddress'
import Info from './info.svg'
import OrderHeader from '../UI/OrderHeader'
import PaymentLayout from './PaymentLayout'

import QrCode from '../UI/QrCode'

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice',
}

const styles = {
  list: css({
    display: 'block',
    '> dt': {
      float: 'left',
      textAlign: 'right',
      width: 120,
      fontWeight: 700,
      marginRight: '24px',
    },
    '> dd': {
      marginBottom: 8,
    },
  }),
  paymentMethods: css({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  }),
  buttonGroup: css({
    margin: -8,
  }),
  button: css({
    margin: 8,
  }),
  package: css({
    fontSize: 16,
    color: '#323232',
    fontWeight: 'bold',
  }),
  changeButton: css({
    color: '#3e8fe4 !important',
    fontWeight: 'bold !important',
    marginLeft: '12px',
  }),
  divider: css({
    border: 0,
    height: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  }),
  container: css({
    display: 'flex',
    flexDirection: 'row',
  }),
  left: css({
    flex: '0 0 70%',
  }),
  right: css({
    flex: 1,
    marginRight: '12px',
    '& img': {
      float: 'right',
    },
  }),
}

const Divider = () => <hr {...styles.divider} />

const PaymentMenu = props => {
  const { open, anchorEl, paymentButtons, onClick } = props

  const Item = props => {
    let {
      title,
      description,
      icon,
      order,
      billingCurrency,
      accountBalance,
      requireAccountBalance,
    } = props

    if (typeof icon === 'string') {
      icon = <img src={icon} />
    }

    const price = order[valueField[billingCurrency.toLowerCase()]]
    const canAfford = price <= accountBalance
    const widgetRequireAccountBalance = requireAccountBalance

    const disabled =
      !canAfford &&
      ((widgetRequireAccountBalance && requireAccountBalance !== false) ||
        requireAccountBalance)

    return (
      <MenuItem open={open} onClick={() => onClick(props)} disabled={disabled}>
        {icon && <ListItemIcon style={{ margin: 0 }}>{icon}</ListItemIcon>}
        <ListItemText primary={title} secondary={description} />
      </MenuItem>
    )
  }

  return (
    <div>
      <Menu anchorEl={anchorEl} open={open}>
        {paymentButtons &&
          paymentButtons.map((options, index) => (
            <div key={index}>
              <Item {...options} {...props} />
              {index < paymentButtons.length - 1 && <Divider />}
            </div>
          ))}
      </Menu>
    </div>
  )
}

class NewPayment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      paymentMethod: props.paymentButtons[0],
    }
  }

  openMenu = () =>
    this.setState({
      open: true,
    })

  menuClick = button => {
    // if callback is set, then it's an old payment button
    // keep this for backwards compability
    if (button.callback) {
      button.paymentModeOptions = {
        title: button.title,
        callback: button.callback,
      }
    }

    this.setState({
      open: false,
      paymentMethod: button,
    })
  }

  render() {
    const { order, paymentButtons } = this.props

    const method = this.state.paymentMethod

    return (
      <div>
        <PaymentMenu
          {...this.props}
          {...this.state}
          anchorEl={this.anchorEl}
          paymentButtons={paymentButtons}
          onClick={this.menuClick}
        />

        <OrderHeader
          order={order}
          title="Payment"
          subtitle="Confirm the details below to purchase your refill"
          icon={<Info />}
        />

        <PaymentLayout {...this.props}>
          <div>
            <div>
              <p>Pay with</p>
            </div>
            <div>
              <p ref={e => (this.anchorEl = e)}>
                {this.state.paymentMethod.title}
              </p>
              <Button
                {...styles.changeButton}
                onClick={event => this.openMenu()}
              >
                Change
              </Button>
            </div>
          </div>
          <div>
            <div />
            <div>
              {method.paymentMode === 'button' && (
                <Button
                  raised
                  color="primary"
                  onClick={() => method.paymentModeOptions.callback(order)}
                >
                  {method.paymentModeOptions.title}
                </Button>
              )}
              {method.paymentMode === 'btc' && (
                <div {...styles.container}>
                  <div {...styles.left}>
                    Send <i>exactly</i> <strong>{order.btcPrice} BTC</strong> to
                    this address:
                    <BitcoinAddress address={order.payment.address} />
                    <br />
                    <br />
                    <Button
                      {...styles.bottomButton}
                      raised
                      color="primary"
                      onClick={() =>
                        (window.location.href = order.payment.BIP21)
                      }
                    >
                      Open wallet
                    </Button>
                  </div>
                  <div {...styles.right}>
                    <QrCode value={order.payment.BIP21} size={150} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </PaymentLayout>
      </div>
    )
  }
}

NewPayment.propTypes = {
  order: PropTypes.object.isRequired,
  showBTCAddress: PropTypes.bool.isRequired,
  paymentButtons: PropTypes.array,
}

export default NewPayment

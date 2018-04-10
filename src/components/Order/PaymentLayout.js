import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';

import Tooltip from 'material-ui/Tooltip';
import {
  paymentStatusProp,
  orderProp,
  amountProp,
  operatorResultProp,
  currencyProp,
  fnProp,
  numberProp,
} from '../../lib/prop-types';
import { selectAmount } from '../../store/ui';
import { selectOperator } from '../../store/operator';
import { updatePaymentStatus } from '../../actions/index';
import setClipboardText from '../../lib/clipboard-helper';

const styles = {
  container: css({
    fontFamily: '',
    backgroundColor: '#fff',
    '& > div': {
      display: 'flex',
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        padding: '14px 0 14px 0',
        minHeight: '38px',
      },
      '& > div:first-of-type': {
        justifyContent: 'flex-end',
        margin: 0,
        flex: '0 0 68px',
        fontWeight: '500',
        fontSize: '10px',
        color: '#777777',
        minHeight: '50px',
        textTransform: 'uppercase',
        textAlign: 'end',
        padding: '0 14px 0 4px',
        '& > img': {
          width: '64px',
          height: 'auto',
        },
        '@media(max-width: 460px)': {
          flexBasis: '44px',
          '& > img': {
            width: '24px',
          },
        },
      },
      '& > div:last-of-type': {
        flex: 'auto',
        fontSize: '16px',
        color: '#323232',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        '& > p': {
          padding: 0,
          margin: 0,
        },
      },
    },
  }),
  infoContainer: css({
    fontWeight: '500',
  }),
  cellContainer: css({
    flexDirection: 'column !important',
    alignItems: 'flex-start !important',
    lineHeight: '20px',
  }),
  topLabel: css({
    display: 'block',
    color: '#777777',
    fontWeight: '500',
    fontSize: '10px',
    textTransform: 'uppercase',
  }),
  label: css({
    fontWeight: '500',
    fontSize: '12px',
    color: '#777777',
  }),
  paymentLabel: css({
    fontSize: '12px !important',
  }),
  logo: css({
    maxWidth: 48,
  }),
  amount: css({
    margin: 0,
  }),
};

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice',
};

class PaymentLayout extends PureComponent {
  static propTypes = {
    order: orderProp,
    updatePaymentStatus: fnProp,
    children: PropTypes.node.isRequired,
    amount: amountProp,
    operator: operatorResultProp,
    number: numberProp,
    billingCurrency: currencyProp,
    paymentStatus: paymentStatusProp,
  };

  state = {
    countdownInterval: null,
    timeLeft: '15:00',
    tooltip: false,
    invoiceTime: null,
  };

  componentDidMount() {
    if (this.showCountdown) {
      if (this.state.invoiceTime === null) {
        this.setState({
          invoiceTime: this.props.order.invoiceTime,
        });
      }

      this.setState({
        countdownInterval: setInterval(() => {
          const { updatePaymentStatus, order } = this.props;
          const { invoiceTime } = this.state;

          const expiring = order.expirationTime;
          let diff = new Date(expiring - invoiceTime);

          if (!order.paid && (invoiceTime > expiring || order.expired)) {
            diff = '00:00';

            updatePaymentStatus({
              status: 'expired',
              orderId: order.orderId,
              data: {},
            });
          } else {
            let minutes = diff.getMinutes();
            let seconds = diff.getSeconds();

            if (minutes < 10) minutes = '0' + minutes;

            if (seconds < 10) seconds = '0' + seconds;

            diff = `${minutes}:${seconds}`;
          }

          this.setState({ timeLeft: diff, invoiceTime: invoiceTime + 1000 });
        }, 1000),
      });
    }
  }

  componentWillUnmount() {
    const { countdownInterval } = this.state;

    if (countdownInterval) clearInterval(countdownInterval);
  }

  get showCountdown() {
    const { paymentStatus } = this.props;

    return !paymentStatus.status || paymentStatus.status === 'partial';
  }

  copy = text => {
    this.setState({ tooltip: true });
    setTimeout(() => this.setState({ tooltip: false }), 2000);
    setClipboardText(text);
  };

  render() {
    const {
      children,
      amount,
      operator,
      number,
      billingCurrency,
      order,
    } = this.props;

    const showNumber = !operator.result || !operator.result.noNumber;

    let billingCurrencyDisplayName = (
      order.payment.altcoinCode || 'BTC'
    ).toUpperCase();

    const price = order[valueField[billingCurrency.toLowerCase()]];
    let coinPrice = order.payment.altcoinPrice || order.btcPrice;

    if (billingCurrencyDisplayName === 'LNBC') {
      coinPrice = order.payment.bitsPrice;
      billingCurrencyDisplayName = 'bits';
    } else if (billingCurrencyDisplayName === 'LNLTC') {
      coinPrice = order.payment.litesPrice;
      billingCurrencyDisplayName = 'lites';
    }

    let formattedPrice = coinPrice + ' ' + billingCurrencyDisplayName;

    const displayCurrency = billingCurrency === 'XBT' ? 'BTC' : billingCurrency;

    if (displayCurrency !== billingCurrencyDisplayName) {
      formattedPrice += ` (${price} ${displayCurrency})`;
    }

    return (
      <div {...styles.container}>
        <div>
          <div>
            <img
              src={operator.result.logoImage}
              alt={operator.result.name}
              {...styles.logo}
            />
          </div>
          <div {...styles.cellContainer} {...styles.infoContainer}>
            <span {...styles.topLabel}>Refill details</span>
            <p>{`${operator.result.name} ${amount} ${
              operator.result.currency
            }`}</p>
            <p {...styles.label}>{showNumber && number}</p>
          </div>
        </div>

        <div>
          <div>Price</div>
          <div
            {...(this.showCountdown ? styles.cellContainer : {})}
            {...styles.infoContainer}
          >
            <Tooltip
              open={this.state.tooltip}
              title="Copied!"
              placement="right-end"
            >
              <p {...styles.amount} onClick={() => this.copy(formattedPrice)}>
                {formattedPrice}
              </p>
            </Tooltip>
            {this.showCountdown && (
              <p {...styles.label}>Time left: {this.state.timeLeft}</p>
            )}
          </div>
        </div>

        {children}
      </div>
    );
  }
}

export default connect(
  state => ({
    amount: selectAmount(state),
    operator: selectOperator(state),
  }),
  dispatch => ({
    updatePaymentStatus: (...args) => dispatch(updatePaymentStatus(...args)),
  })
)(PaymentLayout);

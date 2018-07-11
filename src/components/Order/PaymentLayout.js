import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'react-emotion';

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
import { selectOperator, selectAmount, selectNumber } from '../../store';
import { updatePaymentStatus } from '../../actions/index';
import setClipboardText from '../../lib/clipboard-helper';

const styles = {
  container: css`
    background-color: #fff;

    & > div {
      display: flex;

      & > div {
        display: flex;
        align-items: center;
        padding: 14px 0 14px 0;
        min-height: 38px;
      }

      & > div:first-of-type {
        justify-content: flex-end;
        margin: 0px;
        flex: 0 0 68px;
        font-weight: 500;
        font-size: 10px;
        color: #777777;
        min-height: 50px;
        text-transform: uppercase;
        text-align: end;
        padding: 0 16px;
        min-width: 84px;

        & > img {
          width: 64px;
          height: auto;
        }

        @media (max-width: 460px) {
          flex-basis: 44px;
          & > img {
            width: 24px;
          }
        }
      }
      & > div:last-of-type {
        flex: auto;
        font-size: 16px;
        color: #323232;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);

        & > p {
          padding: 0;
          margin: 0px;
        }
      }
    }
  `,
  infoContainer: css`
    font-weight: 500;
  `,
  cellContainer: css`
    flex-direction: column !important;
    align-items: flex-start !important;
    line-height: 20px;
  `,
  topLabel: css`
    display: block;
    color: #777777;
    font-weight: 500;
    font-size: 10px;
    text-transform: uppercase;
  `,
  label: css`
    font-weight: 500;
    font-size: 12px;
    color: #777777;
  `,
  paymentLabel: css`
    font-size: 12px !important;
  `,
  logo: css`
    max-width: 48px;
  `,
  amount: css`
    margin: 0;
  `,
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
    invoiceTime: 15 * 60 * 1000,
  };

  componentDidMount() {
    this.mounted = true;
    if (this.showCountdown) {
      this.setState({
        countdownInterval: setInterval(() => {
          const { updatePaymentStatus, order } = this.props;
          const { invoiceTime } = this.state;

          let diff = new Date(invoiceTime);

          if (!order.paid && (invoiceTime < 0 || order.expired)) {
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

          this.mounted &&
            this.setState({ timeLeft: diff, invoiceTime: invoiceTime - 1000 });
        }, 1000),
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    const { countdownInterval } = this.state;

    if (countdownInterval) clearInterval(countdownInterval);
  }

  get showCountdown() {
    const { paymentStatus } = this.props;

    return !paymentStatus.status || paymentStatus.status === 'partial';
  }

  copy = text => {
    this.setState({ tooltip: true });
    setTimeout(() => this.mounted && this.setState({ tooltip: false }), 2000);
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
      paymentStatus,
    } = this.props;

    const showRecipient = operator.result.recipientType !== 'none';
    const isDelivered = paymentStatus.status === 'delivered';

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
      <div className={styles.container}>
        <div>
          <div>
            <img
              src={operator.result.logoImage}
              alt={operator.result.name}
              className={styles.logo}
            />
          </div>
          <div className={`${styles.cellContainer} ${styles.infoContainer}`}>
            <span className={styles.topLabel}>Refill details</span>
            <p>{`${operator.result.name} ${amount} ${
              operator.result.currency
            }`}</p>
            <p className={styles.label}>{showRecipient && number}</p>
          </div>
        </div>

        <div>
          <div>{!isDelivered && 'Price'}</div>
          <div
            className={`${styles.infoContainer} ${this.showCountdown &&
              styles.cellContainer}`}>
            {isDelivered &&
              showRecipient && (
                <p className={styles.amount}>
                  Delivered
                  {operator.result &&
                    operator.result.slug === 'reddit-gold' &&
                    ' Reddit Gold'}
                  {' to '} {number}
                </p>
              )}
            {!isDelivered && (
              <Tooltip
                open={this.state.tooltip}
                title="Copied!"
                placement="right-end">
                <p
                  className={styles.amount}
                  onClick={() => this.copy(formattedPrice)}>
                  {formattedPrice}
                </p>
              </Tooltip>
            )}
            {this.showCountdown && (
              <p className={styles.label}>Expiring in {this.state.timeLeft}</p>
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
    number: selectNumber(state),
  }),
  dispatch => ({
    updatePaymentStatus: (...args) => dispatch(updatePaymentStatus(...args)),
  })
)(PaymentLayout);

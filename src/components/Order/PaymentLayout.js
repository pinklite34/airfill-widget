import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { selectAmount } from '../../store/ui';
import { selectOperator } from '../../store/operator';
import { updatePaymentStatus } from '../../actions/index';

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
};

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice',
};

class PaymentLayout extends React.Component {
  state = {
    countdownInterval: null,
    timeLeft: '15:00',
  };

  componentDidMount() {
    if (this.showCountdown) {
      this.setState({
        countdownInterval: setInterval(() => {
          const { updatePaymentStatus, order } = this.props;

          const now = new Date().getTime();
          const expiring = order.expirationTime;
          let diff = new Date(expiring - now);

          if (now > expiring || order.expired) {
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

          this.setState({ timeLeft: diff });
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

    const billingCurrencyDisplayName = order.payment.altcoinCode || 'BTC';

    const price = order[valueField[billingCurrency.toLowerCase()]];
    const coinPrice = order.payment.altcoinPrice || order.btcPrice;
    let formattedPrice =
      coinPrice + ' ' + billingCurrencyDisplayName.toUpperCase();

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
            <p>{formattedPrice}</p>
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

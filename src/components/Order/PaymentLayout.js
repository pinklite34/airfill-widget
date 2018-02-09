import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { selectAmount } from '../../store/ui';
import { selectOperator } from '../../store/operator';

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
        minHeight: '38px'
      },
      '& > div:first-of-type': {
        justifyContent: 'flex-end',
        padding: 0,
        margin: 0,
        flex: '0 0 70px',
        fontWeight: 'bold',
        fontSize: '10px',
        color: '#777777',
        minHeight: '50px',
        textTransform: 'uppercase',
        paddingRight: '12px',
        '& > img': {
          width: '64px',
          height: 'auto'
        }
      },
      '& > div:last-of-type': {
        flex: 'auto',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#323232',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        '& > p': {
          padding: 0,
          margin: 0
        }
      }
    }
  }),
  cellContainer: css({
    flexDirection: 'column !important',
    alignItems: 'flex-start !important',
    lineHeight: '24px'
  }),
  topLabel: css({
    display: 'block',
    color: '#777777',
    fontWeight: 'bold',
    fontSize: '10px',
    textTransform: 'uppercase'
  }),
  label: css({
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#777777'
  }),
  paymentLabel: css({
    fontSize: '12px !important'
  }),
  logo: css({
    maxWidth: 48
  })
};

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice'
};

class PaymentLayout extends React.Component {

  state = {
    countdownInterval: null,
    timeLeft: ''
  };

  componentDidMount() {
    this.setState({
      countdownInterval: setInterval(() => {
        const now = new Date().getTime();
        const expiring = this.props.order.expirationTime;
        let diff = new Date(expiring - now);

        if (now > expiring) {
          diff = '00:00';
        } else {
          diff = `${diff.getMinutes()}:${diff.getSeconds()}`;
        }

        this.setState({ timeLeft: diff });
      }, 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.countdownInterval);
  }

  render() {
    const {
      children,
      amount,
      operator,
      number,
      country,
      billingCurrency,
      order
    } = this.props;

    const billingCurrencyDisplayName =
      billingCurrency === 'XBT' ? 'BTC' : billingCurrency;
    const price = order[valueField[billingCurrency.toLowerCase()]];
    const formattedPrice = price + ' ' + billingCurrencyDisplayName.toUpperCase();
    const showNumber = !operator.result || !operator.result.noNumber;

    return (
      <div {...styles.container}>

        <div>
          <div>
            <img src={operator.result.logoImage} alt={operator.result.name} {...styles.logo} />
          </div>
          <div {...styles.cellContainer}>
            <span {...styles.topLabel}>Refill details</span>
            <p>{`${operator.result.name} ${amount} ${operator.result.currency}`}</p>
            <p {...styles.label}>
              {showNumber && number}
            </p>
          </div>
        </div>

        <div>
          <div>
            Price
          </div>
          <div {...styles.cellContainer}>
            <p>{formattedPrice}</p>
            <p {...styles.label}>
              Time left: {this.state.timeLeft}
            </p>
          </div>
        </div>

        {children}
      </div>
    );
  }
};

export default connect(state => ({
  amount: selectAmount(state),
  operator: selectOperator(state)
}))(PaymentLayout);

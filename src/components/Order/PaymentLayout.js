import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';

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

import Flex from '../UI/Flex';
import Text from '../UI/Text';
import SectionTitle from '../UI/SectionTitle';
import Icon from '../UI/Icon';

const Row = styled(Flex)`
  min-height: 38px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const RowTitle = styled('div')`
  justify-content: flex-end;
  flex: 0 0 68px;
  text-align: end;
  padding: 14px 16px;
  min-width: 72px;

  & > img {
    width: 64px;
    height: auto;
  }

  @media (max-width: ${p => p.theme.bp.mobile}) {
    display: none;
  }
`;

const RowContent = styled(Flex)`
  width: 100%;
  font-size: 16px;
  color: #323232;
  padding: 14px 16px 14px 0;
  border-bottom: ${p => p.theme.bd.primary};
  font-weight: 500;

  & > p {
    padding: 0;
    margin: 0px;
  }

  @media (max-width: ${p => p.theme.bp.mobile}) {
    padding: 14px 16px;
  }
`;

const ChildContainer = styled(Flex)`
  line-height: 21px;
  width: 100%;
  padding: 14px 16px 0 0;
  align-items: flex-start;

  @media (max-width: ${p => p.theme.bp.mobile}) {
    padding: 14px 16px 0;
  }
`;

const valueField = {
  xbt: 'btcPrice',
  eur: 'eurPrice',
  usd: 'usdPrice',
};

class PaymentLayout extends PureComponent {
  static propTypes = {
    order: orderProp,
    updatePaymentStatus: fnProp,
    children: PropTypes.node,
    amount: amountProp,
    operator: operatorResultProp,
    number: numberProp,
    billingCurrency: currencyProp,
    paymentStatus: paymentStatusProp,
  };

  static defaultProps = {
    order: { payment: {} },
    operator: { result: {} },
    billingCurrency: '',
  };

  state = {
    countdownInterval: null,
    timeLeft: '15:00',
    tooltip: false,
    invoiceTime: 15 * 60 * 1000,
  };

  componentDidMount() {
    this.mounted = true;
    if (this.shouldShowCountdown()) {
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

  onCopy = text => {
    this.setState({ tooltip: true });
    setTimeout(() => this.mounted && this.setState({ tooltip: false }), 2000);
    setClipboardText(text);
  };

  getBillingCurrency() {
    const { order } = this.props;
    const { altcoinCode } = order.payment;
    const displayCurrency = (altcoinCode || 'BTC').toUpperCase();

    return displayCurrency === 'LNBC'
      ? 'bits'
      : displayCurrency === 'LNLTC'
        ? 'lites'
        : displayCurrency;
  }

  getCoinPrice(billingDisplayCurrency) {
    const { order } = this.props;
    const { altcoinPrice, bitsPrice, litesPrice } = order.payment;
    const coinPrice = altcoinPrice || order.btcPrice;

    return billingDisplayCurrency === 'LNBC'
      ? bitsPrice
      : billingDisplayCurrency === 'LNLTC'
        ? litesPrice
        : coinPrice;
  }

  getFormattedPrice() {
    const { billingCurrency, order } = this.props;
    const billingDisplayCurrency = this.getBillingCurrency();
    const coinPrice = this.getCoinPrice(billingDisplayCurrency);
    const price = order[valueField[billingCurrency.toLowerCase()]];
    const formattedPrice = `${coinPrice} ${billingDisplayCurrency}`;
    const displayCurrency =
      billingCurrency === 'XBT' ? 'BTC' : billingDisplayCurrency;

    return displayCurrency !== billingDisplayCurrency
      ? `${formattedPrice} (${price} ${displayCurrency})`
      : formattedPrice;
  }

  shouldShowCountdown() {
    const { paymentStatus } = this.props;
    if (!paymentStatus) return false;
    return !paymentStatus.status || paymentStatus.status === 'partial';
  }

  render() {
    const { children, amount, operator, number, paymentStatus } = this.props;
    const { timeLeft, tooltip } = this.state;

    const { recipientType, logoImage, name, currency, slug } =
      (operator && operator.result) || {};

    const showRecipient = recipientType !== 'none';
    const isDelivered = paymentStatus && paymentStatus.status === 'delivered';
    const formattedPrice = this.getFormattedPrice();
    const productName = slug === 'reddit-gold' ? ' Reddit Gold' : '';
    return (
      <Fragment>
        {paymentStatus && (
          <Fragment>
            <Row>
              <RowTitle>
                <Icon src={logoImage} alt={name} />
              </RowTitle>
              <RowContent>
                <SectionTitle
                  tight
                  text={{
                    id: 'order.details.title',
                    children: 'Refill details',
                  }}
                />
                <Text>{`${name} ${amount} ${currency}`}</Text>
                <Text type="p">{showRecipient && number}</Text>
              </RowContent>
            </Row>

            {isDelivered && showRecipient ? (
              <Row>
                <RowTitle />
                <RowContent>
                  <Text id="order.details.delivered">
                    Delivered {{ productName }} to {{ number }}
                  </Text>
                </RowContent>
              </Row>
            ) : !isDelivered ? (
              <Row>
                <RowTitle>
                  <SectionTitle
                    tight
                    text={{ id: 'order.details.price', children: 'Price' }}
                  />
                </RowTitle>
                <RowContent>
                  <Tooltip open={tooltip} title="Copied!" placement="right-end">
                    <Text onClick={() => this.onCopy(formattedPrice)}>
                      {formattedPrice}
                    </Text>
                  </Tooltip>
                  {this.shouldShowCountdown() && (
                    <Text type="p" id="order.details.expiring">
                      Expiring in {{ timeLeft }}
                    </Text>
                  )}
                </RowContent>
              </Row>
            ) : null}
          </Fragment>
        )}

        {children && (
          <Flex row padding="0 0 16px">
            <RowTitle />
            <ChildContainer>{children}</ChildContainer>
          </Flex>
        )}
      </Fragment>
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

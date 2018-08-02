import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { updatePaymentStatus } from '../../actions';
import {
  amountProp,
  currencyProp,
  fnProp,
  numberProp,
  operatorResultProp,
  orderProp,
  paymentStatusProp,
} from '../../lib/prop-types';
import {
  selectAmount,
  selectNumber,
  selectOperator,
  selectPaymentMethod,
} from '../../store';
import Flex from '../UI/Flex';
import Icon from '../UI/Icon';
import SectionTitle from '../UI/SectionTitle';
import Text from '../UI/Text';
import { getPaymentInfo } from '../../lib/price';

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
  padding: ${p => p.padding};
  align-items: flex-start;

  @media (max-width: ${p => p.theme.bp.mobile}) {
    padding: 14px 16px 0;
  }
`;

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
    paymentMethod: PropTypes.object,
    fullWidth: PropTypes.bool,
    childPadding: PropTypes.string,
  };

  static defaultProps = {
    order: { payment: {} },
    operator: { result: {} },
    billingCurrency: '',
    fullWidth: false,
    childPadding: '14px 16px 0 0',
  };

  state = {
    countdownInterval: null,
    timeLeft: '15:00',
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

  shouldShowCountdown() {
    const { paymentStatus } = this.props;
    if (!paymentStatus) return false;
    return !paymentStatus.status || paymentStatus.status === 'partial';
  }

  render() {
    const {
      children,
      amount,
      operator,
      number,
      paymentMethod,
      paymentStatus,
      order,
      fullWidth,
      childPadding,
    } = this.props;

    const { timeLeft } = this.state;

    const { recipientType, logoImage, name, currency, slug } =
      (operator && operator.result) || {};

    const showRecipient = recipientType !== 'none';
    const isDelivered = paymentStatus && paymentStatus.status === 'delivered';

    const stuff = getPaymentInfo(
      paymentMethod.paymentMode,
      paymentStatus,
      order
    );
    const formattedPrice = `${stuff.displayPrice} ${stuff.unit}`;
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
                  <Text onClick={() => this.onCopy(formattedPrice)}>
                    {formattedPrice}
                  </Text>
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
          <Flex row padding={fullWidth ? 0 : '0 0 16px'}>
            {!fullWidth && <RowTitle />}
            <ChildContainer padding={childPadding || '14px 16px 0 0'}>
              {children}
            </ChildContainer>
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
    paymentMethod: selectPaymentMethod(state),
  }),
  dispatch => ({
    updatePaymentStatus: (...args) => dispatch(updatePaymentStatus(...args)),
  })
)(PaymentLayout);

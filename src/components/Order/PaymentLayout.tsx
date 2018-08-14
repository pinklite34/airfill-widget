import * as React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { updatePaymentStatus } from '../../actions';
import { getPaymentInfo } from '../../lib/price';
import {
  Amount,
  BillingCurrency,
  OperatorResult,
  Order,
  PaymentButton,
  PaymentStatus,
  RecipientType,
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

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    display: none;
  }
`;

const RowContent = styled(Flex)`
  width: 100%;
  font-size: 16px;
  color: #323232;
  padding: 14px 16px 14px 0;
  border-bottom: ${(p: any) => p.theme.bd.primary};
  font-weight: 500;

  & > p {
    padding: 0;
    margin: 0px;
  }

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    padding: 14px 16px;
  }
`;

const ChildContainer = styled(Flex)`
  line-height: 21px;
  width: 100%;
  align-items: flex-start;

  @media (max-width: ${(p: any) => p.theme.bp.mobile}) {
    padding: ${(p: any) => p.padding || '14px 16px 0'};
  }

  padding: ${(p: any) => p.padding};
`;

interface PaymentLayoutProps {
  order: Order;
  updatePaymentStatus: typeof updatePaymentStatus;
  children: any;
  amount: Amount;
  operator: OperatorResult;
  number: RecipientType;
  billingCurrency: BillingCurrency;
  paymentStatus: PaymentStatus;
  fullWidth: boolean;
  paymentMethod: PaymentButton;
}

class PaymentLayout extends React.PureComponent<PaymentLayoutProps> {
  static defaultProps = {
    order: { payment: {} },
    operator: { result: {} },
    billingCurrency: '',
    fullWidth: false,
  };

  state = {
    countdownInterval: null,
    timeLeft: '15:00',
    invoiceTime: 15 * 60 * 1000,
  };

  private mounted;

  componentDidMount() {
    this.mounted = true;
    if (this.shouldShowCountdown()) {
      this.setState({
        countdownInterval: setInterval(() => {
          const { updatePaymentStatus, order } = this.props;
          const { invoiceTime } = this.state;

          const diff = new Date(invoiceTime);
          let time;

          if (!order.paid && (invoiceTime < 0 || order.expired)) {
            time = '00:00';

            updatePaymentStatus({
              status: 'expired',
              orderId: order.orderId,
              data: {},
            });
          } else {
            let minutes = String(diff.getMinutes());
            let seconds = String(diff.getSeconds());

            if (diff.getMinutes() < 10) {
              minutes = '0' + minutes;
            }

            if (diff.getSeconds() < 10) {
              seconds = '0' + seconds;
            }

            time = `${minutes}:${seconds}`;
          }

          if (this.mounted) {
            this.setState({ timeLeft: time, invoiceTime: invoiceTime - 1000 });
          }
        }, 1000),
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    const { countdownInterval } = this.state;
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
  }

  shouldShowCountdown() {
    const { paymentStatus } = this.props;
    if (!paymentStatus) {
      return false;
    }
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
    } = this.props;

    const { timeLeft } = this.state;

    const { recipientType, logoImage, name, currency, slug } =
      (operator && operator.result) || ({} as any);

    const showRecipient = recipientType !== 'none';
    const isDelivered = paymentStatus && paymentStatus.status === 'delivered';

    const paymentInfo = getPaymentInfo(
      paymentMethod.paymentMode,
      paymentStatus,
      order
    );
    const formattedPrice = `${paymentInfo.displayPrice} ${paymentInfo.unit}`;
    const productName = slug === 'reddit-gold' ? ' Reddit Gold' : '';

    return (
      <React.Fragment>
        {paymentStatus && (
          <React.Fragment>
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
                  <Text>{formattedPrice}</Text>
                  {this.shouldShowCountdown() && (
                    <Text type="p" id="order.details.expiring">
                      Expiring in {{ timeLeft }}
                    </Text>
                  )}
                </RowContent>
              </Row>
            ) : null}
          </React.Fragment>
        )}

        {children && (
          <Flex row padding={fullWidth ? '0px' : '0 0 16px'}>
            {!fullWidth && <RowTitle />}
            <ChildContainer padding={fullWidth ? '0px' : '14px 16px 0 0'}>
              {children}
            </ChildContainer>
          </Flex>
        )}
      </React.Fragment>
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

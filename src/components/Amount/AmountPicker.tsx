import * as React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { Amount, Config, OperatorResult } from '../../types';

import { setAmount } from '../../actions';
import { isAffordable, selectValidAmount } from '../../lib/amount-validation';
import { getDisplayName, getPrice } from '../../lib/currency-helpers';
import { isValidEmail } from '../../lib/email-validation';
import { selectAmount, selectOperator } from '../../store';

import ActiveSection from '../UI/ActiveSection';
import NextButton from '../UI/NextButton';
import Spinner from '../UI/Spinner';
import Text from '../UI/Text';
import AmountPackage from './AmountPackage';
import AmountRange from './AmountRange';
import ExtraInfo from './ExtraInfo';

const Packages = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

interface AmountPickerProps extends RouteComponentProps<{}> {
  config: Config;
  operator: OperatorResult;
  amount: Amount;
  setAmount: typeof setAmount;
}

class AmountPicker extends React.PureComponent<AmountPickerProps> {
  componentDidMount() {
    if (!this.props.operator.isLoading) {
      this.onAmountChange(this.props as any);
    }
  }

  componentDidUpdate(prevProps) {
    const { operator } = this.props;
    if (!operator.isLoading && prevProps.operator.isLoading) {
      this.onAmountChange(this.props as any);
    }
  }

  onAmountChange = ({ setAmount, config, operator }) => {
    const { packages, isRanged, range, currency, amount } =
      operator.result || ({} as any);

    if (packages && !amount) {
      const a = selectValidAmount(
        packages,
        config.billingCurrency,
        config.userAccountBalance,
        range
      );
      setAmount(a);
    }
  };

  next = () => {
    const { history, operator, config } = this.props;

    if (operator.result && operator.result.recipientType !== 'none') {
      history.push('/refill/selectRecipient');
    } else if (!isValidEmail(config.orderOptions.email)) {
      history.push('/refill/selectStatusEmail');
    } else {
      history.push('/refill/selectPayment');
    }
  };

  renderPackage = (pkg, canAffordAny) => {
    const { amount, operator, setAmount, config } = this.props;
    const {
      userAccountBalance,
      requireAccountBalance,
      billingCurrency,
    } = config;

    let price = getPrice(pkg, billingCurrency);

    if (billingCurrency !== 'XBT') {
      price = price.toFixed(2);
    }

    const formattedBillingCurrency = getDisplayName(
      billingCurrency
    ).toUpperCase();

    return (
      <AmountPackage
        key={pkg.value}
        name={
          isNaN(Number(pkg.value))
            ? pkg.value
            : `${pkg.value} ${operator.result.currency}`
        }
        showPrice={
          !config.coin ||
          config.coin === 'bitcoin' ||
          config.coin === 'lightning'
        }
        price={price}
        currency={formattedBillingCurrency}
        selected={amount === pkg.value}
        onClick={() => setAmount(pkg.value)}
        disabled={
          canAffordAny &&
          requireAccountBalance &&
          !isAffordable(pkg, billingCurrency, userAccountBalance)
        }
      />
    );
  };

  render() {
    const { amount, operator, setAmount, config } = this.props;
    const { billingCurrency } = config;

    // no package or custom amount selected
    // amount might be string (like reddit gold)
    const disabled =
      operator.result && operator.result.isRanged
        ? amount < operator.result.range.min ||
          amount > operator.result.range.max
        : amount === 'NaN' || (typeof amount !== 'string' && isNaN(amount));

    // can afford any listed package
    const canAffordAny =
      operator.result &&
      config.requireAccountBalance &&
      operator.result.packages.some(pkg =>
        isAffordable(pkg, config.billingCurrency, config.userAccountBalance)
      );

    return operator.isLoading ||
      !(operator.result && operator.result.packages) ? (
      <ActiveSection>
        <Spinner />
      </ActiveSection>
    ) : (
      <ActiveSection
        padding="16px 0 0"
        renderNextButton={() => (
          <NextButton disabled={disabled} onClick={this.next} />
        )}
      >
        <ExtraInfo info={operator.result.extraInfo} operator={operator} />

        {operator.result.isRanged ? (
          <React.Fragment>
            <Text
              type="p"
              id="title.selectamount"
              padding="0 0 0 16px"
              size="16px"
            >
              Select amount
            </Text>
            <AmountRange
              amount={amount}
              range={operator.result.range}
              currency={operator.result.currency}
              billingCurrency={billingCurrency}
              onChange={setAmount}
              config={config}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Text
              type="p"
              id="title.selectpackage"
              padding="0 0 0 16px"
              size="16px"
            >
              Click to select package
            </Text>
            <Packages>
              {operator.result.packages.map(pkg =>
                this.renderPackage(pkg, canAffordAny)
              )}
            </Packages>
          </React.Fragment>
        )}
      </ActiveSection>
    );
  }
}

export default connect(
  state => ({
    operator: selectOperator(state),
    amount: selectAmount(state),
  }),
  {
    setAmount,
  }
)(withRouter(AmountPicker));

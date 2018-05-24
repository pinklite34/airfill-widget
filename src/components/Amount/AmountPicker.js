import React, { PureComponent } from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { selectOperator, selectAmount } from '../../store';
import { setAmount } from '../../actions';
import Button from 'material-ui/Button';

import { isValidEmail } from '../../lib/email-validation';

import { selectValidAmount } from '../../lib/amount-validation';
import { getPrice, getDisplayName } from '../../lib/currency-helpers';
import {
  configProp,
  operatorResultProp,
  amountProp,
  fnProp,
  historyProp,
} from '../../lib/prop-types';

import Card from 'material-ui/Card';
import Radio from 'material-ui/Radio';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import ActiveSection from '../UI/ActiveSection';
import SectionTitle from '../UI/SectionTitle';
import Info from '../UI/info.svg';

import AmountPackage from './AmountPackage';
import AmountRange from './AmountRange';

const styles = {
  packages: css`
    background-color: #fff;
    margin: 0 -16px;
    & > label {
      display: flex;
      align-items: center;
      padding-right: 2px;
      height: auto;
      margin: 0;
      border-top: 1px solid rgba(0,0,0,0.08);
      &:last-of-type {
        border-bottom: 1px solid rgba(0,0,0,0.08);
      },
    },
  `,
  operatorInfoContainer: css`
    font-weight: 500;
    margin-bottom: 16px;
  `,
  operatorInfo: css`
    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    & svg {
      margin-right: 8px;
      width: 32px;
      height: 32px;
    },
  `,
  title: css`
    margin-left: 36px;
  `,
  button: css`
    margin-top: 12px !important;
  `,
};

class AmountPicker extends PureComponent {
  static propTypes = {
    config: configProp,
    operator: operatorResultProp,
    amount: amountProp,
    setAmount: fnProp,
    history: historyProp,
  };

  componentDidMount() {
    if (!this.props.operator.isLoading) {
      this.onAmountChange(this.props);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.operator.isLoading && this.props.operator.isLoading) {
      this.onAmountChange(newProps);
    }
  }

  onAmountChange = ({ setAmount, config, operator }) => {
    const { packages, isRanged, range, currency, amount } =
      operator.result || {};

    if (packages && !amount) {
      setAmount(
        selectValidAmount({
          amount,
          ranged: isRanged,
          maxCost: config.userAccountBalance,
          costConversionRate: isRanged && range.userPriceRate,
          currency,
          packages,
        })
      );
    }
  };

  next = () => {
    const { history, operator, config } = this.props;

    const showEmail = !isValidEmail(config.orderOptions.email);
    const showNumber = operator.result.recipientType !== 'none';

    if (showEmail || showNumber) {
      history.push('/refill/selectRecipient');
    } else {
      history.push('/refill/selectPayment');
    }
  };

  renderPackage = (pkg, i) => {
    const { amount, operator, setAmount, config } = this.props;
    const {
      userAccountBalance,
      requireAccountBalance,
      billingCurrency,
    } = config;

    const price = getPrice(pkg, billingCurrency);
    const formattedBillingCurrency = getDisplayName(
      billingCurrency
    ).toUpperCase();

    return (
      <label key={pkg.value}>
        <Radio
          checked={amount === pkg.value}
          onChange={e => setAmount(pkg.value)}
          disabled={requireAccountBalance && price > userAccountBalance}
        />
        <AmountPackage
          name={
            operator.result.type === 'data'
              ? pkg.value
              : `${pkg.value} ${operator.result.currency}`
          }
          price={`${price} ${formattedBillingCurrency}`}
        />
      </label>
    );
  };

  render() {
    const { amount, operator, setAmount, config } = this.props;
    const { billingCurrency } = config;

    // no package or custom amount selected
    // amount might be string (like reddit gold)
    const disabled =
      amount === 'NaN' || (typeof amount !== 'string' && isNaN(amount));

    return operator.isLoading ||
      !(operator.result && operator.result.packages) ? (
      <ActiveSection title="Select amount">
        <CircularProgress />
      </ActiveSection>
    ) : (
      <ActiveSection>
        {operator.result.extraInfo && (
          <Card className={styles.operatorInfoContainer}>
            <div className={styles.operatorInfo}>
              <Info fill="#555555" />
              <div
                dangerouslySetInnerHTML={{ __html: operator.result.extraInfo }}
              />
            </div>
          </Card>
        )}

        <SectionTitle {...styles.title}>{'Select amount'}</SectionTitle>

        <div className={`${styles.packages} amount-picker`}>
          {operator.result.packages.map(this.renderPackage)}
        </div>

        {operator.result.isRanged && (
          <AmountRange
            amount={amount}
            range={operator.result.range}
            currency={operator.result.currency}
            billingCurrency={billingCurrency}
            onChange={setAmount}
          />
        )}
        <Button
          color="primary"
          disabled={disabled}
          raised
          onClick={this.next}
          className={styles.button}>
          Continue
        </Button>
      </ActiveSection>
    );
  }
}

export default compose(
  withRouter,
  connect(
    state => ({
      operator: selectOperator(state),
      amount: selectAmount(state),
    }),
    {
      setAmount,
    }
  )
)(AmountPicker);

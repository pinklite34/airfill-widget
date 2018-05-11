import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { css } from 'glamor';
import { selectOperator, selectAmount } from '../../store';
import { setAmount } from '../../actions';
import { Button } from 'material-ui';

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
import { CircularProgress } from 'material-ui/Progress';

import ActiveSection from '../UI/ActiveSection';
import SectionTitle from '../UI/SectionTitle';
import ErrorBanner from '../UI/ErrorBanner';
import Info from '../UI/info.svg';

import AmountPackage from './AmountPackage';
import AmountRange from './AmountRange';

const styles = {
  packages: css({
    backgroundColor: '#fff',
    margin: '0 -16px',
    '& > label': {
      display: 'flex',
      alignItems: 'center',
      paddingRight: '2px',
      height: 'auto',
      margin: 0,
      borderTop: '1px solid rgba(0,0,0,0.08)',
      '&:last-of-type': {
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      },
    },
  }),
  operatorInfoContainer: css({
    fontWeight: 500,
    marginBottom: 16,
  }),
  operatorInfo: css({
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& svg': {
      marginRight: 8,
      width: 32,
      height: 32,
    },
  }),
  title: css({
    marginLeft: 36,
  }),
};

class AmountPicker extends PureComponent {
  static propTypes = {
    config: configProp,
    operator: operatorResultProp,
    amount: amountProp,
    setAmount: fnProp,
    history: historyProp,
  };

  state = {
    error: null,
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
    const { history, operator, config, amount } = this.props;

    // no package or custom amount selected
    // amount might be string (like reddit gold)
    if (amount === 'NaN' || (typeof amount !== 'string' && isNaN(amount))) {
      this.setState({
        error: 'Amount not selected',
      });
      return;
    }

    const showEmail = !isValidEmail(config.orderOptions.email);
    const showNumber = !operator.result || !operator.result.noNumber;

    if (showEmail || showNumber) {
      history.push('/refill/selectReceipent');
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
    const { error } = this.state;
    const { billingCurrency } = config;

    return operator.isLoading ||
      !(operator.result && operator.result.packages) ? (
      <ActiveSection title="Select amount">
        <CircularProgress />
      </ActiveSection>
    ) : (
      <ActiveSection>
        {error && <ErrorBanner>{error.message || error}</ErrorBanner>}
        {operator.result.extraInfo && (
          <Card className={`${styles.operatorInfoContainer}`}>
            <div {...styles.operatorInfo}>
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
        <Button color="primary" raised onClick={this.next}>
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

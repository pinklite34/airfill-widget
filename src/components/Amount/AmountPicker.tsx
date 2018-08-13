import * as React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import { selectAmount, selectOperator } from '../../store';
import { setAmount } from '../../actions';
import { selectValidAmount } from '../../lib/amount-validation';
import { getPrice, getDisplayName } from '../../lib/currency-helpers';
import {
  amountProp,
  configProp,
  fnProp,
  historyProp,
  operatorResultProp,
} from '../../lib/prop-types';

import Radio from 'material-ui/Radio';

import ActiveSection from '../UI/ActiveSection';
import NextButton from '../UI/NextButton';
import SectionTitle from '../UI/SectionTitle';
import Spinner from '../UI/Spinner';
import AmountPackage from './AmountPackage';
import AmountRange from './AmountRange';

import { isValidEmail } from '../../lib/email-validation';
import ExtraInfo from './ExtraInfo';

const Title = styled(SectionTitle)`
  margin-left: 72px;
`;

const Packages = styled('div')`
  background-color: #fff;

  & > label {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-right: 2px;
    height: auto;
    margin: 0;
    border-top: ${(p: any) =>  p.theme.bd.primary};
  }
`;

const RadioWrapper = styled('div')`
  width: 72px;
  display: flex;
  justify-content: center;
`;

class AmountPicker extends React.PureComponent<any> {
  static propTypes = {
    config: configProp,
    operator: operatorResultProp,
    amount: amountProp,
    setAmount: fnProp,
    history: historyProp,
  };

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
      operator.result || {} as any;

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

    if (operator.result && operator.result.recipientType !== 'none') {
      history.push('/refill/selectRecipient');
    } else if (!isValidEmail(config.orderOptions.email)) {
      history.push('/refill/selectStatusEmail');
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

    const showPrice = !config.coin || config.coin === 'bitcoin';

    return (
      <label key={pkg.value}>
        <RadioWrapper>
          <Radio
            checked={amount === pkg.value}
            onChange={e => setAmount(pkg.value)}
            disabled={requireAccountBalance && price > userAccountBalance}
          />
        </RadioWrapper>
        <AmountPackage
          name={
            isNaN(Number(pkg.value))
              ? pkg.value
              : `${pkg.value} ${operator.result.currency}`
          }
          price={showPrice && `${price} ${formattedBillingCurrency}`}
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
      <ActiveSection>
        <Spinner />
      </ActiveSection>
    ) : (
      <ActiveSection
        padding="16px 0 0"
        renderNextButton={() => (
          <NextButton disabled={disabled} onClick={this.next} />
        )}>
        <ExtraInfo info={operator.result.extraInfo} operator={operator} />

        <Title text={{ id: 'title.selectamount', children: 'Select amount' }} />

        <Packages>{operator.result.packages.map(this.renderPackage)}</Packages>

        {operator.result.isRanged && (
          <AmountRange
            amount={amount}
            range={operator.result.range}
            currency={operator.result.currency}
            billingCurrency={billingCurrency}
            onChange={setAmount}
            config={config}
          />
        )}
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
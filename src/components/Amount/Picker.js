import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { selectOperator, selectAmount } from '../../store';
import { setAmount, createOrder } from '../../actions';

import { selectValidAmount } from '../../lib/amount-validation';
import { getPrice, getDisplayName } from '../../lib/currency-helpers';

import Card from 'material-ui/Card';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { CircularProgress } from 'material-ui/Progress'

import ActiveSection from '../UI/ActiveSection';
import SectionTitle from '../UI/SectionTitle';

import Package from './Package';
import Ranged from './Ranged';
import Info from '../UI/info.svg';

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
        borderBottom: '1px solid rgba(0,0,0,0.08)'
      }
    }
  }),
  operatorInfoContainer: css({
    fontWeight: 500,
    marginBottom: 16
  }),
  operatorInfo: css({
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& svg': {
      marginRight: 8,
      width: 32,
      height: 32
    }
  }),
  title: css({
    marginLeft: 36
  })
};

class Picker extends Component {
  handleAmountChange = (props, amount) => {
    const { setAmount, config, operator } = props;
    const { packages, isRanged, range, currency } = operator.result;

    if (!amount) {
      setAmount(
        selectValidAmount({
          amount,
          ranged: isRanged,
          maxCost: config.userAccountBalance,
          costConversionRate: isRanged && range.userPriceRate,
          currency,
          packages
        })
      );
    }
  };

  componentDidMount() {
    if (!this.props.operator.isLoading) {
      this.handleAmountChange(this.props, this.props.amount);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.operator.isLoading && this.props.operator.isLoading) {
      this.handleAmountChange(newProps, newProps.amount);
    }
  }

  render() {
    const { amount, operator, setAmount, config } = this.props;

    if (operator.isLoading || !operator.result.packages) {
      return (
        <ActiveSection title="Select amount">
          <CircularProgress />
        </ActiveSection>
      );
    }

    const {
      userAccountBalance,
      requireAccountBalance,
      billingCurrency
    } = config;

    return (
      <ActiveSection>
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

        <SectionTitle {...styles.title}>Select amount</SectionTitle>

        <div className={`${styles.packages} amount-picker`}>
          {operator.result.packages.map((pkg, i) => {
            const price = getPrice(pkg, billingCurrency);
            const formattedPrice =
              price + ' ' + getDisplayName(billingCurrency).toUpperCase();
            const disabled =
              requireAccountBalance && price > userAccountBalance;

            // Data packages should not have currency in the title
            const name =
              operator.result.type === 'data'
                ? pkg.value
                : `${pkg.value} ${operator.result.currency}`;

            return (
              <label key={pkg.value}>
                <Radio
                  checked={amount === pkg.value}
                  onChange={e => setAmount(pkg.value)}
                  disabled={disabled}
                />
                <Package name={name} price={formattedPrice} />
              </label>
            );
          })}
        </div>

        {operator.result.isRanged && (
          <Ranged
            amount={amount}
            range={operator.result.range}
            currency={operator.result.currency}
            billingCurrency={billingCurrency}
            onChange={setAmount}
          />
        )}
      </ActiveSection>
    );
  }
}

export default connect(
  state => ({
    operator: selectOperator(state),
    amount: selectAmount(state)
  }),
  {
    setAmount,
    createOrder
  }
)(Picker);

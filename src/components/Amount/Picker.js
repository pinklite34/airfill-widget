import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { selectOperator, selectAmount } from '../../store';
import { setAmount, createOrder } from '../../actions';

import { selectValidAmount } from '../../lib/amount-validation';
import { getPrice, getDisplayName } from '../../lib/currency-helpers';

import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';

import ActiveSection from '../UI/ActiveSection';

import Package from './Package';
import Ranged from './Ranged';

const styles = {
  packages: css({
    backgroundColor: '#fff',
    margin: '0 -16px',
    '& > label': {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      height: 'auto',
      margin: 0,
      borderTop: '1px solid rgba(0,0,0,0.08)',
      '&:last-of-type': {
        borderBottom: '1px solid rgba(0,0,0,0.08)'
      },
      '& > span': {
        paddingLeft: 24
      }
    }
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
          <ProgressBar type="circular" />
        </ActiveSection>
      );
    }

    const {
      userAccountBalance,
      requireAccountBalance,
      billingCurrency
    } = config;

    return (
      <ActiveSection title="Select amount">
        <RadioGroup
          value={String(amount)}
          onChange={setAmount}
          className={`${styles.packages}`}
        >
          {operator.result.packages.map((pkg, i) => {
            const price = getPrice(pkg, billingCurrency);
            const formattedPrice =
              price + ' ' + getDisplayName(billingCurrency).toUpperCase();
            const disabled =
              requireAccountBalance && price > userAccountBalance;

            return (
              <RadioButton
                key={i}
                disabled={disabled}
                value={String(pkg.value)}
                label={
                  <Package
                    name={`${pkg.value} ${operator.result.currency}`}
                    price={formattedPrice}
                  />
                }
              />
            );
          })}
        </RadioGroup>

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

import { formatNumber } from 'libphonenumber-js';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { css } from 'react-emotion';
import { connect } from 'react-redux';

import {
  setEmail,
  setNumber,
  setSubscribeNewsletter,
  trigger,
} from '../../actions';
import { isValidEmail } from '../../lib/email-validation';
import { getRecipientIcon } from '../../lib/icon-picker';
import { getPlaceholder, isValidForCountry } from '../../lib/number-helpers';
import { isPhoneNumber } from '../../lib/number-input-helpers';
import {
  amountProp,
  configProp,
  countryProp,
  emailProp,
  fnProp,
  historyProp,
  numberProp,
  operatorResultProp,
} from '../../lib/prop-types';
import {
  selectAmount,
  selectCountry,
  selectEmail,
  selectNumber,
  selectOperator,
  selectSubscribeNewsletter,
} from '../../store';
import ErrorBanner from '../UI/ErrorBanner';
import InputRow from '../UI/NumberInput';

const styles = {
  field: css`
    flex: 1 0 250px;
    margin: 0;
    margin-bottom: 24;
  `,
  input: css`
    max-width: 250;
    padding: 0 !important;
    background-color: #fff;
    margin-bottom: 24px;
    & > input: {
      padding: 8px;
    },
  `,
  button: css`
    width: 250px;
    height: 38px;
    margin-bottom: 0;
  `,
};

const Text = styled('p')`
  font-weight: 500;
`;

const Container = styled('div')`
  background-color: #fafafa;
  padding: 0 16px 16px;
`;

const InputContainer = styled('div')`
  @media (min-width: 460px) {
    width: 50%;
  }
`;

const Content = styled('div')`
  padding: 16px 0;
`;

class Recipient extends PureComponent {
  static propTypes = {
    config: configProp,
    amount: amountProp,
    operator: operatorResultProp,
    history: historyProp,
    trigger: fnProp,
    setNumber: fnProp,
    setEmail: fnProp,
    classes: PropTypes.object,
    number: numberProp,
    email: emailProp,
    paymentMethod: PropTypes.object,
    country: countryProp,
    setSubscribeNewsletter: fnProp,
    subscribing: PropTypes.bool.isRequired,
  };

  state = {
    error: null,
    placeholder: '',
  };

  componentDidMount() {
    const { operator, country, config } = this.props;
    let placeholder;

    switch (operator.result.recipientType) {
      case 'phone_number':
        placeholder = formatNumber(
          { country: country.alpha2, phone: getPlaceholder(country.alpha2) },
          'National'
        );
        console.log(placeholder);
        break;
      case 'email':
        placeholder = config.orderOptions.email || 'example@mail.com';
        break;
    }

    this.setState({
      placeholder,
    });
  }

  onChange = number => this.props.setNumber(number);

  getNumberLabel = () => {
    const { operator } = this.props;

    if (operator.result) {
      switch (operator.result.recipientType) {
        case 'phone_number':
          return 'The phone number to top up';
        case 'username':
          return 'Reddit username / post permalink';
        case 'email':
          return 'Delivery email address';
        case 'none':
        default:
          return '';
      }
    }
  };

  validateInput = () => {
    const { number, country, operator } = this.props;

    switch (operator.result.recipientType) {
      case 'phone_number':
        if (country.alpha2 === 'XI') {
          return isPhoneNumber(number);
        }
        return isValidForCountry(number, country);
      case 'email':
        return isValidEmail(number);
      default:
        return true;
    }
  };

  validationMessage = () => {
    const { operator, country } = this.props;

    if (!this.validateInput()) {
      switch (operator.result.recipientType) {
        case 'phone_number':
          if (country.alpha2 === 'XI') {
            return 'Please enter a valid phone number';
          }
          return 'Phone number does not match country';
        case 'email':
          return 'Please enter a valid email address';
      }
    }

    return '';
  };

  continue = () => {
    const { history, config } = this.props;

    if (this.validateInput()) {
      if (!isValidEmail(config.orderOptions.email)) {
        history.push('/refill/selectStatusEmail');
      } else {
        history.push('/refill/selectPayment');
      }
    } else {
      this.setState({
        error: this.validationMessage(),
      });
    }
  };

  render() {
    const {
      // config,
      // setEmail,
      country,
      number,
      operator,
      // email,
      // setSubscribeNewsletter,
      // subscribing,
    } = this.props;
    const { error } = this.state;

    const Icon = getRecipientIcon(operator.result);

    return (
      <Container>
        {error && <ErrorBanner>{error.message || error}</ErrorBanner>}
        <Content>
          <Text>{this.getNumberLabel()}</Text>
          <InputContainer>
            <InputRow
              country={country}
              value={number}
              placeholder={this.state.placeholder}
              onChange={this.onChange}
              submitEnabled={this.validateInput()}
              onSubmit={this.continue}
              icon={<Icon />}
            />
          </InputContainer>
        </Content>
        <Button
          color="primary"
          raised
          disabled={!number}
          onClick={this.continue}
          className={styles.button}>
          Continue
        </Button>
      </Container>
    );
  }
}

export default connect(
  state => ({
    number: selectNumber(state),
    email: selectEmail(state),
    amount: selectAmount(state),
    operator: selectOperator(state),
    country: selectCountry(state),
    subscribing: selectSubscribeNewsletter(state),
  }),
  {
    setNumber,
    setEmail,
    trigger,
    setSubscribeNewsletter,
  }
)(Recipient);

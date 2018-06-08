import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { connect } from 'react-redux';

import {
  setNumber,
  setEmail,
  trigger,
  setSubscribeNewsletter,
} from '../../actions';
import {
  selectNumber,
  selectEmail,
  selectAmount,
  selectOperator,
  selectCountry,
  selectSubscribeNewsletter,
} from '../../store';

import {
  historyProp,
  configProp,
  operatorResultProp,
  fnProp,
  emailProp,
  numberProp,
  amountProp,
  countryProp,
} from '../../lib/prop-types';
import { isValidEmail } from '../../lib/email-validation';

import { isValidForCountry } from '../../lib/number-helpers';
import { isPhoneNumber } from '../../lib/number-input-helpers';

import Button from 'material-ui/Button';

import ErrorBanner from '../UI/ErrorBanner';
import InputRow from '../UI/NumberInput';

import PhoneIcon from './phone.svg';

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
  };

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
    console.log(country);
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
    const { history } = this.props;

    if (this.validateInput()) {
      history.push('/refill/selectPayment');
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
      // email,
      // setSubscribeNewsletter,
      // subscribing,
    } = this.props;
    const { error } = this.state;

    // const showEmail = !isValidEmail(config.orderOptions.email);

    return (
      <Container>
        {error && <ErrorBanner>{error.message || error}</ErrorBanner>}
        <Content>
          {/* <Field label={numberLabel} className={styles.field}>
              <Input
                onChange={e => setNumber(e.target.value)}
                type={
                  operator.result.recipientType === 'phone_number'
                    ? 'tel'
                    : 'text'
                }
                value={number}
                className={styles.input}
              />
              </Field> */}
          <Text>{this.getNumberLabel()}</Text>
          <InputContainer>
            <InputRow
              country={country}
              value={number}
              onChange={this.onChange}
              submitEnabled={this.validateInput()}
              icon={<PhoneIcon />}
            />
          </InputContainer>
          {/* showEmail && (
            <Fragment>
              <Field
                label="E-mail address"
                hint="The email address will receive order status updates"
                className={styles.field}>
                <Input
                  onChange={e =>
                    setEmail({
                      value: e.target.value,
                      inFocus: true,
                    })
                  }
                  onBlur={e =>
                    setEmail({
                      value: e.target.value,
                      inFocus: false,
                    })
                  }
                  value={email.value}
                  className={styles.input}
                />
              </Field>
              <Field>
                <Checkbox
                  onChange={e => setSubscribeNewsletter(e.target.checked)}
                  checked={subscribing}
                />
                Add me to the newsletter to receive news about new products and
                features
              </Field>
            </Fragment>
          ) */}
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

import { History } from 'history';
import { formatNumber } from 'libphonenumber-js';
import * as React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import {
  setEmail,
  setNumber,
  setSubscribeNewsletter,
  trigger,
} from '../../actions';
import { isValidEmail } from '../../lib/email-validation';
import { getRecipientIcon } from '../../lib/icon-picker';
import { getPlaceholder } from '../../lib/number-helpers';
import { isPhoneNumber } from '../../lib/number-input-helpers';
import {
  selectAmount,
  selectCountry,
  selectEmail,
  selectNumber,
  selectOperator,
  selectSubscribeNewsletter,
} from '../../store';
import {
  Amount,
  Config,
  Country,
  Email,
  OperatorResult,
  PaymentMode,
} from '../../types';
import ActiveSection from '../UI/ActiveSection';
import NextButton from '../UI/NextButton';
import InputRow from '../UI/NumberInput';
import Text from '../UI/Text';

const InputContainer = styled('div')`
  @media (min-width: 460px) {
    width: 50%;
  }
`;

interface RecipientProps {
  config: Config;
  amount: Amount;
  operator: OperatorResult;
  history: History;
  trigger: () => void;
  setNumber: typeof setNumber;
  setEmail: typeof setEmail;
  classes: any;
  number: string;
  email: Email;
  paymentMethod: PaymentMode;
  country: Country;
  setSubscribeNewsletter: typeof setSubscribeNewsletter;
  subscribing: boolean;
}

class RecipientPicker extends React.PureComponent<RecipientProps> {
  state = {
    error: null,
    placeholder: '',
  };

  componentDidMount() {
    const { operator, country, config } = this.props;
    let placeholder;

    switch (operator.result && operator.result.recipientType) {
      case 'phone_number':
        placeholder = formatNumber(
          {
            country: country.alpha2 as any,
            phone: getPlaceholder(country.alpha2),
          },
          'National'
        );
        break;
      case 'email':
        placeholder = config.orderOptions.email || 'example@mail.com';
        break;
    }

    this.setState({
      placeholder,
    });
  }

  onChange = (e: string) => this.props.setNumber(e);

  getNumberLabel = () => {
    const { operator } = this.props;

    if (operator.result) {
      switch (operator.result && operator.result.recipientType) {
        case 'phone_number':
          return {
            id: 'recipient.label.phone',
            children: 'The phone number to top up',
          };
        case 'username':
          return {
            id: 'recipient.label.username',
            children: 'Reddit username / post permalink',
          };
        case 'email':
          return {
            id: 'recipient.label.email',
            children: 'Delivery email address',
          };
        case 'none':
        default:
          return { id: 'recipient.label.empty', children: '' };
      }
    }
  };

  validateInput = () => {
    const { number, operator } = this.props;

    switch (operator.result && operator.result.recipientType) {
      case 'phone_number':
        return isPhoneNumber(number);
      case 'email':
        return isValidEmail(number);
      default:
        return true;
    }
  };

  validationMessage = () => {
    const { operator, country } = this.props;

    if (!this.validateInput()) {
      switch (operator.result && operator.result.recipientType) {
        case 'phone_number':
          if (country.alpha2 === 'XI') {
            return {
              id: 'recipient.validation.number',
              children: 'Please enter a valid phone number',
            };
          }
          return {
            id: 'recipient.validation.country',
            children:
              'The phone number appears to be typed incorrectly. Please verify that there are no extra digits.',
          };
        case 'email':
          return {
            id: 'recipient.validation.email',
            children: 'Please enter a valid email address',
          };
      }
    }

    return { id: 'recipient.validation.empty', children: '' };
  };

  continue = () => {
    const { history, config } = this.props;

    if (this.validateInput()) {
      if (!isValidEmail(config.orderOptions.email)) {
        history.push('/refill/selectEmail');
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
    const { country, number, operator } = this.props;
    const { error } = this.state;

    const Icon = getRecipientIcon(operator.result);

    return (
      <ActiveSection
        padding="0 16px 16px"
        renderNextButton={() => (
          <NextButton disabled={!number} onClick={this.continue} />
        )}
        error={error}
      >
        <Text type="h3" {...this.getNumberLabel()} />
        <InputContainer>
          <InputRow
            value={number}
            placeholder={this.state.placeholder}
            onChange={this.onChange}
            submitEnabled={this.validateInput()}
            onSubmit={this.continue}
            icon={<Icon />}
          />
        </InputContainer>
      </ActiveSection>
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
)(RecipientPicker);

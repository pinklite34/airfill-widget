import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { setEmail, setSubscribeNewsletter } from '../../actions';
import { selectEmail, selectSubscribeNewsletter } from '../../store';

import {
  historyProp,
  configProp,
  fnProp,
  emailProp,
} from '../../lib/prop-types';

import Checkbox from 'material-ui/Checkbox';

import NextButton from '../UI/NextButton';
import ErrorBanner from '../UI/ErrorBanner';
import NumberInput from '../UI/NumberInput';

import EmailIcon from '../../assets/email.svg';
import ActiveSection from '../UI/ActiveSection';

const Text = styled('p')`
  font-weight: 500;
`;

const InputContainer = styled('div')`
  @media (min-width: 460px) {
    width: 50%;
  }
`;

const CheckboxContainer = styled('div')`
  display: flex;
  flex-direction: row;
`;

class StatusEmail extends PureComponent {
  static propTypes = {
    config: configProp,
    history: historyProp,
    setEmail: fnProp,
    email: emailProp,
    setSubscribeNewsletter: fnProp,
    subscribing: PropTypes.bool.isRequired,
  };

  onChange = email => this.props.setEmail({ value: email, inFocus: true });

  validateInput = () => this.props.email.valid;

  continue = () => {
    const { history } = this.props;

    if (this.validateInput()) {
      history.push('/refill/selectPayment');
    }
  };

  render() {
    const { email, setSubscribeNewsletter, subscribing } = this.props;

    console.log('status email');

    return (
      <ActiveSection
        padding="0 16px"
        renderNextButton={() => (
          <NextButton
            disabled={!this.validateInput()}
            onClick={this.continue}
          />
        )}>
        {email.error && <ErrorBanner>{email.error}</ErrorBanner>}
        <Text>The email address will receive order status updates</Text>
        <InputContainer>
          <NumberInput
            value={email.value}
            onChange={this.onChange}
            submitEnabled={this.validateInput()}
            icon={<EmailIcon />}
            onSubmit={this.continue}
          />
        </InputContainer>
        <CheckboxContainer>
          <Checkbox
            onChange={e => setSubscribeNewsletter(e.target.checked)}
            checked={subscribing}
          />
          <Text
            onClick={() => setSubscribeNewsletter(!subscribing)}
            style={{ cursor: 'pointer' }}>
            Add me to the newsletter to receive news about new products and
            features
          </Text>
        </CheckboxContainer>
      </ActiveSection>
    );
  }
}

export default connect(
  state => ({
    email: selectEmail(state),
    subscribing: selectSubscribeNewsletter(state),
  }),
  {
    setEmail,
    setSubscribeNewsletter,
  }
)(StatusEmail);

import { History } from 'history';
import * as React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { Config, Email } from '../../types';

import { setEmail, setSubscribeNewsletter } from '../../actions';
import { selectEmail, selectSubscribeNewsletter } from '../../store';

import ActiveSection from '../UI/ActiveSection';
import Checkbox from '../UI/Checkbox';
import Flex from '../UI/Flex';
import NextButton from '../UI/NextButton';
import NumberInput from '../UI/NumberInput';
import Text from '../UI/Text';

import EmailIcon from '../../assets/email.svg';

const InputContainer = styled('div')`
  @media (min-width: 460px) {
    width: 50%;
  }
`;

class StatusEmail extends React.PureComponent<{
  config: Config;
  history: History;
  setEmail: typeof setEmail;
  email: Email;
  setSubscribeNewsletter: typeof setSubscribeNewsletter;
  subscribing: boolean;
}> {
  onChange = email => this.props.setEmail({ value: email, inFocus: true });

  validateInput = () => this.props.email.valid;

  continue = () => {
    const { history } = this.props;

    if (this.validateInput()) {
      history.push('/refill/selectPayment');
    }
  };

  onNewsletter = e => this.props.setSubscribeNewsletter(e.target.checked);

  render() {
    const { email, setSubscribeNewsletter, subscribing } = this.props;

    return (
      <ActiveSection
        padding="0 16px"
        renderNextButton={() => (
          <NextButton
            disabled={!this.validateInput()}
            onClick={this.continue}
          />
        )}
        error={email.error}
      >
        <Text type="h3" id="email.description">
          Email address for order status updates
        </Text>
        <InputContainer>
          <NumberInput
            value={email.value}
            onChange={this.onChange}
            submitEnabled={this.validateInput()}
            icon={<EmailIcon />}
            onSubmit={this.continue}
          />
        </InputContainer>
        <Flex row justifyContent="flex-start" alignItems="center">
          <Checkbox
            onChange={this.onNewsletter}
            checked={subscribing}
            text={{
              id: 'email.newsletter',
              children:
                'Add me to the newsletter to receive news about new products and features',
            }}
          />
        </Flex>
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

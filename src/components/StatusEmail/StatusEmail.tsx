import * as React from 'react';
import * as PropTypes from 'prop-types';
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
import NumberInput from '../UI/NumberInput';

import EmailIcon from '../../assets/email.svg';
import ActiveSection from '../UI/ActiveSection';
import Text from '../UI/Text';
import Flex from '../UI/Flex';

const InputContainer = styled('div')`
  @media (min-width: 460px) {
    width: 50%;
  }
`;

class StatusEmail extends React.PureComponent<any> {
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

    return (
      <ActiveSection
        padding="0 16px"
        renderNextButton={() => (
          <NextButton
            disabled={!this.validateInput()}
            onClick={this.continue}
          />
        )}
        error={email.error}>
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
            onChange={e => setSubscribeNewsletter(e.target.checked)}
            checked={subscribing}
          />
          <Text
            type="p"
            onClick={() => setSubscribeNewsletter(!subscribing)}
            style={{ cursor: 'pointer' }}
            id="email.newsletter">
            Add me to the newsletter to receive news about new products and
            features
          </Text>
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

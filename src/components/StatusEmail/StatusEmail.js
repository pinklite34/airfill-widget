import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { connect } from 'react-redux';

import { setEmail, setSubscribeNewsletter } from '../../actions';
import { selectEmail, selectSubscribeNewsletter } from '../../store';

import {
  historyProp,
  configProp,
  fnProp,
  emailProp,
} from '../../lib/prop-types';

import Button from 'material-ui/Button';

import ErrorBanner from '../UI/ErrorBanner';
import InputRow from '../UI/NumberInput';

import EmailIcon from '../../assets/email.svg';

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

class StatusEmail extends PureComponent {
  static propTypes = {
    config: configProp,
    history: historyProp,
    setEmail: fnProp,
    email: emailProp,
    setSubscribeNewsletter: fnProp,
    subscribing: PropTypes.bool.isRequired,
  };

  state = {
    error: null,
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
    const {
      // config,
      // setEmail,
      email,
      // setSubscribeNewsletter,
      // subscribing,
    } = this.props;
    const { error } = this.state;

    return (
      <Container>
        {error && <ErrorBanner>{error.message || error}</ErrorBanner>}
        <Content>
          <Text>The email address will receive order status updates</Text>
          <InputContainer>
            <InputRow
              value={email.value}
              onChange={this.onChange}
              submitEnabled={this.validateInput()}
              icon={<EmailIcon />}
            />
          </InputContainer>
        </Content>
        <Button
          color="primary"
          raised
          disabled={!this.validateInput()}
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
    email: selectEmail(state),
    subscribing: selectSubscribeNewsletter(state),
  }),
  {
    setEmail,
    setSubscribeNewsletter,
  }
)(StatusEmail);

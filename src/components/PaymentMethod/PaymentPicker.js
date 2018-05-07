import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withRouter } from 'react-router';
import { historyProp } from '../../lib/prop-types';

import PaymentItem from './PaymentItem';
import Button from 'material-ui/Button';

const Container = styled('div')`
  padding: 24px;
`;

const MethodContainer = styled('div')`
  max-height: ${72 * 4}px;
  width: 100%;
  overflow-y: scroll;
`;

class PaymentMethod extends React.Component {
  state = {
    method: null,
  };

  select = method =>
    this.setState({
      method,
    });

  render() {
    const { history, paymentButtons } = this.props;

    return (
      <Container>
        <MethodContainer>
          {paymentButtons.map(method => (
            <PaymentItem
              key={method.title}
              {...method}
              onClick={() => this.select(method)}
              selected={method === this.state.method}
            />
          ))}
        </MethodContainer>

        <Button
          color="primary"
          raised
          onClick={() => history.push('/refill/payment')}>
          Continue
        </Button>
      </Container>
    );
  }
}

PaymentMethod.propTypes = {
  history: historyProp,
  paymentButtons: PropTypes.array.isRequired,
};

export default withRouter(PaymentMethod);

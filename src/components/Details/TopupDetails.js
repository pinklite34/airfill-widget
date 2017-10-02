import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';

import { createOrder, setNumber, setEmail } from '../../actions';
import { selectNumber, selectEmail, selectAmount } from '../../store';

import { Input } from 'react-toolbox/lib/input';
import Field from '../UI/Field';
import SectionTitle from '../UI/SectionTitle';

const styles = {
  title: css({
    margin: 0
  }),
  container: css({
    backgroundColor: '#FAFAFA',
    padding: '0 16px 16px'
  }),
  field: css({
    flex: '1 0 250px',
    margin: 0,
    marginBottom: 24
  }),
  input: css({
    maxWidth: 250,
    padding: '0 !important'
  }),
  button: css({
    width: 250,
    marginBottom: 8
  })
};

class TopupDetails extends Component {
  state = {
    showEmail: true
  };

  createOrder = () => {
    this.props
      .createOrder(this.props.config.orderOptions)
      .then(() => this.props.history.push('/payment'));
  };

  isComplete = () =>
    this.props.amount && this.props.number && this.props.email.valid;

  componentDidMount() {
    const showEmail = !(
      this.props.email.valid &&
      this.props.email.value === this.props.config.orderOptions.email
    );

    this.setState({
      showEmail
    });
  }

  render() {
    const { number, email } = this.props;
    const { showEmail } = this.state;

    return (
      <div {...styles.container}>
        <Field label="Phone number" hint="The phone number to top up" {...styles.field}>
          <Input
            onChange={this.props.setNumber}
            type="tel"
            value={number}
            className={`${styles.input}`}
          />
        </Field>
        {showEmail && (
          <Field
            label="E-mail address"
            hint="The email address will receive order status updates"
            {...styles.field}
          >
            <Input
              onChange={value =>
                this.props.setEmail({
                  value,
                  inFocus: true
                })}
              onBlur={e =>
                this.props.setEmail({
                  value: e.target.value,
                  inFocus: false
                })}
              value={email.value}
              className={`${styles.input}`}
            />
          </Field>
        )}
        <Button
          primary
          raised
          disabled={!this.isComplete()}
          onClick={this.createOrder}
          className={`${styles.button}`}
        >
          Continue
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    number: selectNumber(state),
    email: selectEmail(state),
    amount: selectAmount(state)
  }),
  {
    createOrder,
    setNumber,
    setEmail
  }
)(TopupDetails);

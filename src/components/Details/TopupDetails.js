import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';

import { createOrder, setNumber, setEmail } from '../../actions';
import { selectNumber, selectEmail, selectAmount } from '../../store';
import { isValidEmail } from '../../lib/email-validation';

import { Input } from 'react-toolbox/lib/input';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import Field from '../UI/Field';

import Error from './error.svg';

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
    padding: '0 !important',
    backgroundColor: '#fff',
    margin: '4px -8px',
    '& > input': {
      padding: 8
    }
  }),
  button: css({
    width: 250,
    marginBottom: 0
  }),
  error: css({
    backgroundColor: '#E1283C',
    margin: '0 -16px 16px',
    padding: 16,
    color: '#fff',
    fontWeight: 700,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.16)',
    position: 'relative',
    zIndex: 10
  }),
  icon: css({
    marginRight: 16
  }),
  progressBar: css({
    width: '36px !important',
    height: '36px !important',
    padding: 8,
    '& .theme__path___1xZSU': {
      stroke: '#fff'
    }
  })
};

class TopupDetails extends Component {
  state = {
    error: null,
    isLoading: false
  };

  createOrder = () => {
    this.setState({
      isLoading: true
    });
    this.props
      .createOrder(this.props.config.orderOptions)
      .then(() => this.props.history.push('/payment'))
      .catch(error =>
        this.setState({
          isLoading: false,
          error
        })
      );
  };

  isComplete = () =>
    this.props.amount && this.props.number && this.props.email.valid;

  render() {
    const { number, email } = this.props;
    const { error, isLoading } = this.state;
    const showEmail = !isValidEmail(this.props.config.orderOptions.email);

    return (
      <div {...styles.container}>
        {error && (
          <div {...styles.error}>
            <Error fill="#fff" {...styles.icon} />
            <div>{error.message}</div>
          </div>
        )}
        <Field
          label="Phone number"
          hint="The phone number to top up"
          {...styles.field}
        >
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
          disabled={!this.isComplete() || isLoading}
          onClick={this.createOrder}
          className={`${styles.button}`}
        >
          {isLoading ? (
            <ProgressBar type="circular" className={`${styles.progressBar}`} />
          ) : (
            'Continue'
          )}
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

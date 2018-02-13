import PropTypes from 'prop-types'
import React from 'react'
import Button from 'material-ui/Button'
import OrderHeader from '../UI/OrderHeader'
import Confirmed from './confirmed.svg'
import { css } from 'glamor'
import PaymentLayout from './PaymentLayout'

const styles = {
  textContainer: css({
    display: 'block !important',
    lineHeight: '21px',
    marginRight: '48px',
  }),
  info: css({
    color: '#777777',
    fontSize: '14px',
  }),
  link: css({
    color: '#3e8fe4',
    fontSize: '14px',
    textDecoration: 'underline',
  }),
  button: css({
    marginTop: '12px',
  }),
}

const RefillDelivered = props => {
  return (
    <div>
      <OrderHeader
        order={props.order}
        title="Refill delivered"
        subtitle="The refill delivery has been confirmed by the operator"
        icon={<Confirmed />}
      />

      <PaymentLayout {...props}>
        <div>
          <div />
          <div {...styles.textContainer}>
            <span {...styles.info}>
              The refill has delivered and credited to the balance of the target
              device.
            </span>
            <br />
            <span {...styles.link}>Can&apos;t see your refill?</span>
            <br />
            <Button
              color="primary"
              raised
              {...styles.button}
              onClick={props.onReset}
            >
              Buy another refill
            </Button>
          </div>
        </div>
      </PaymentLayout>
    </div>
  )
}

RefillDelivered.propTypes = {
  paymentStatus: PropTypes.object.isRequired,
  onReset: PropTypes.func.isRequired,
}

export default RefillDelivered

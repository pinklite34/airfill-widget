import React from 'react'
import Button from 'material-ui/Button'

const BalanceTooLow = ({ order, history }) => {
  return (
    <div>
      <h3>Insufficient funds</h3>
      <p>
        Your balance on this account is too low to purchase the refill{' '}
        <strong>{order.itemDesc}</strong>.
      </p>
      <Button raised onClick={() => history.push('/refill/selectAmount')}>
        Pick another package
      </Button>
    </div>
  )
}

export default BalanceTooLow

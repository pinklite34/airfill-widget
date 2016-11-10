import React, {PropTypes} from 'react';
import Button from '../../UI/Button';

const ExpiredPayment = ({order, onContinue}) => {
  return (
    <div>
      <h3>Order expired</h3>
      <p>
        This order has expired. Please <a href="location.reload();">refresh
        </a> the page to generate a new invoice.

        Need help? Send us an email at <a href="mailto:support@bitrefill.com?subject=Invoice_expired">
        support@bitrefill.com</a>.
      </p>
    </div>
  );
};

ExpiredPayment.propTypes = {
  order: PropTypes.object.isRequired,
  onContinue: PropTypes.object.isRequired
};

export default ExpiredPayment;

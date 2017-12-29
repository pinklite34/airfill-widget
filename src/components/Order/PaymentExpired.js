import React from 'react';
import Button from 'material-ui/Button';

const ExpiredPayment = () => {
  return (
    <div>
      <h3>Order expired</h3>
      <p>
        This order has expired. Please refresh the page to generate a new
        invoice.
      </p>
      <Button raised onClick={window.location.reload}>
        Refresh page
      </Button>
      <p>
        Need help? Send us an email at{' '}
        <a href="mailto:support@bitrefill.com?subject=Invoice_expired">
          support@bitrefill.com
        </a>.
      </p>
    </div>
  );
};

export default ExpiredPayment;

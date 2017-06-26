import React from 'react';
import { matchRenderWithSnapshot } from '../../../lib/test-helpers';

import RangedAmountField from './RangedAmountField.js';

describe('RangedAmountField', () => {
  it('renders with the min/max rounded up/down', () => {
    matchRenderWithSnapshot(<RangedAmountField
      amount={18}
      range={{min: 4.28, max: 50.28, userPriceRate: 1}}
      currency={'EUR'}
      billingCurrency={'XBT'}
    />);
  });
});

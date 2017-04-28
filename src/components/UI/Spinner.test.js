import React from 'react';
import { matchRenderWithSnapshot } from '../../lib/test-helpers';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders correctly', () => {
    matchRenderWithSnapshot(<Spinner />);
  });

  it('renders with custom text', () => {
    matchRenderWithSnapshot(<Spinner>Custom loading text</Spinner>);
  });

  it('renders without text', () => {
    matchRenderWithSnapshot(<Spinner hideText />);
  });

  it('renders with inverted animation', () => {
    matchRenderWithSnapshot(<Spinner inverted />);
  });

  it('renders inline', () => {
    matchRenderWithSnapshot(<Spinner inline />);
  });
});

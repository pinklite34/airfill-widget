import React from 'react';
import RefillFailed from './5-Failed';
import renderer from 'react-test-renderer';

const props = {
  order: { id: '--ORDER_ID--' },
  onReset: jest.fn()
};

it('renders correctly', () => {
  const tree = renderer.create(<RefillFailed {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('supports auto-refunded orders', () => {
  const tree = renderer
    .create(<RefillFailed {...props} order={{ needRefund: false }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('supports refund address', () => {
  const tree = renderer
    .create(<RefillFailed {...props} refundAddress="--REFUND_ADDR--" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import PhoneNumberInput from './PhoneNumberInput';

const props = {
  onCahnge: jest.fn(),
  type: null,
  country: { alpha2: 'US', countryCallingCodes: ['+1']},
  defaultValue: '',
  label: null,
  hint: null,
  error: null,
  children: '--CHILDREN--'
};

it('renders correctly', () => {
  const tree = renderer.create(<PhoneNumberInput {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Treats VOIP as phone number', () => {
  const tree = renderer.create(<PhoneNumberInput {...props} type="VOIP" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Treats DHT as account number', () => {
  const tree = renderer.create(<PhoneNumberInput {...props} type="DHT"/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Uses default value', () => {
  const tree = renderer.create(<PhoneNumberInput {...props} defaultValue="+12015555555" />).toJSON();
  expect(tree).toMatchSnapshot();
});


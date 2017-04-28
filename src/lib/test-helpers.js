import renderer from 'react-test-renderer';

export const matchRenderWithSnapshot = jsx => {
  const tree = renderer.create(jsx).toJSON();
  expect(tree).toMatchSnapshot();
}

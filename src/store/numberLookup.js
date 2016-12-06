import {
  createCollectionReducer,
  createSingleResultSelector
} from '../lib/rest-helpers';

export default createCollectionReducer('numberLookup');
export const selectNumberLookup = createSingleResultSelector('numberLookup');
export const selectOperator = state => {
  const lookup = selectNumberLookup(state);
  return lookup.result ? lookup.result.operator : null;
};

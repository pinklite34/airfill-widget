import {
  createCollectionReducer,
  createSingleResultSelector
} from '../lib/rest-helpers';

export default createCollectionReducer('airfillWidget.numberLookup');
export const selectNumberLookup = createSingleResultSelector('airfillWidget.numberLookup');
export const selectOperator = state => {
  const lookup = selectNumberLookup(state);
  return lookup.result ? lookup.result.operator : null;
};

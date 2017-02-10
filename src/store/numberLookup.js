import {
  createCollectionReducer,
  createSingleResultSelector
} from '../lib/rest-helpers';

export default createCollectionReducer('airfillWidget.numberLookup');
export const selectNumberLookup = createSingleResultSelector('airfillWidget.numberLookup');

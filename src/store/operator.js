import {
  createCollectionReducer,
  createSingleResultSelector
} from '../lib/rest-helpers';

export default createCollectionReducer('airfillWidget.operator', true);
export const selectOperator = createSingleResultSelector('airfillWidget.operator');

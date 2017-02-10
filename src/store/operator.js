import {
  createCollectionReducer,
  createSingleResultSelector
} from '../lib/rest-helpers';

export default createCollectionReducer('airfillWidget.operator');
export const selectOperator = createSingleResultSelector('airfillWidget.operator');

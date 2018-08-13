import {
  createCollectionReducer,
  createSingleResultSelector,
} from '../lib/rest-helpers';

export default createCollectionReducer('airfillWidget.order');
export const selectOrder = createSingleResultSelector('airfillWidget.order');

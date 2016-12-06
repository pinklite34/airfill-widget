import {
  createCollectionReducer,
  createSingleResultSelector
} from '../lib/rest-helpers';

export default createCollectionReducer('order');
export const selectOrder = createSingleResultSelector('order');

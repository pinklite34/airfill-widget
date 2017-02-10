import {createAction} from 'redux-actions';
import {REHYDRATE} from 'redux-persist/constants';
import {fetch} from './api-client';

const actionTypeForName = name => {
  name = Array.isArray(name) ? name : name.split('.');
  const tail = name[name.length - 1];
  return `load_${tail}`.toUpperCase();
};

// --------------------------
// --- Collection Reducer ---
// --------------------------

export const createCollectionReducer = name => {
  const initialState = {
    isLoading: false,
    error: null,
    items: [],
    page: 0,
    nbPage : 0
  };
  const baseType = actionTypeForName(name);

  return (state=initialState, {type, payload}) => {
    switch (type) {
      case baseType: {
        return { ...state, isLoading: true };
      }

      case baseType + '_SUCCESS': {
        let items;
        if (Array.isArray(payload)) {
          items = payload;
        } else if (payload.page) {
          items = payload.items;
        } else {
          items = [payload];
        }

        let { nbPage, page } = payload;
        return { ...state, items, isLoading: false, error: null, nbPage, page };
      }

      case baseType + '_ERROR': {
        return { ...state, isLoading: false, error: payload.message || payload, nbPage: 0, page: 0};
      }

      case REHYDRATE: {
        const data = createCollectionSelector(name)(payload);
        return { ...state, ...data, isLoading: false };
      }

      default:
        return state;
    }
  };
};

// ----------------------------
// --- Collection Selectors ---
// ----------------------------

export const createCollectionSelector = name => {
  const keyPath = Array.isArray(name) ? name : name.split('.');
  return state => keyPath.reduce((mem, key) => mem && mem[key], state);
};
export const createIsLoadingSelector = name => {
  const collectionSelector = createCollectionSelector(name);
  return state => collectionSelector(state).isLoading;
};
export const createErrorSelector = name => {
  const collectionSelector = createCollectionSelector(name);
  return state => collectionSelector(state).error;
};
export const createItemSelector = name => {
  const collectionSelector = createCollectionSelector(name);
  return (state, id) => (
    collectionSelector(state).items.filter(i => i.id === id)
  );
};
export const createSingleResultSelector = name => {
  const collectionSelector = createCollectionSelector(name);

  return state => {
    const lookup = collectionSelector(state);
    return {
      isLoading: lookup.isLoading,
      error: lookup.error,
      result: lookup.items[0]
    };
  };
};

// --------------------------
// --- Collection Actions ---
// --------------------------

export const createLoadAction = options => {
  // Process options
  if (typeof options === 'string') {
    options = { name: options, uri: '/' + options, targetApi: 'bitrefill' };
  }
  const { uri, name, responseTransform, errorHandler } = options;
  const baseType = actionTypeForName(name);

  // Create internal actions
  const loadStart = createAction(baseType);
  const loadSuccess = createAction(baseType + '_SUCCESS',
    ({response}) => response,
    payload => payload
  );
  const loadError = createAction(baseType + '_ERROR',
    ({response}) => response,
    payload => payload
  );

  // Create internal selectors
  const isLoadingSelector = createIsLoadingSelector(name);

  // Create final thunk action
  return (props={}) => (dispatch, getState) => {
    const isLoading = isLoadingSelector(getState());

    if (!isLoading) {
      props.uri = props.uri || uri;
      dispatch(loadStart({ ...props }));

      const { query, body } = props;
      return fetch(props.uri, {
          query,
          body
        }).then(
        response => {
          response = responseTransform ? responseTransform(response) : response;
          dispatch(loadSuccess({ props, response }));
        },
        error => {
          dispatch(loadError({ props, response: error }));

          if (errorHandler) {
            dispatch(errorHandler(error.response));
          }

          return Promise.reject(error);
        }
      );
    }
    return Promise.reject();
  };
};

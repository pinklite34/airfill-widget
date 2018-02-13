import { REHYDRATE } from 'redux-persist/constants'
import {
  createCollectionReducer,
  createCollectionSelector,
  createIsLoadingSelector,
  createErrorSelector,
  createItemSelector,
  createSingleResultSelector,
  createLoadAction,
} from './rest-helpers'

jest.mock('./api-client', () => {
  return {
    fetch: jest.fn(),
  }
})

import { fetch } from './api-client' // eslint-disable-line

// // --------------------------
// // --- Collection Reducer ---
// // --------------------------

describe('createCollectionReducer', () => {
  const state = {
    isLoading: false,
    error: null,
    items: [],
  }

  const loadingState = {
    ...state,
    isLoading: true,
  }

  const reducer = createCollectionReducer('collection')

  it('returns state if action is unknown', () => {
    const action = { type: 'UNKNOWN_ACTION' }
    expect(reducer(state, action)).toEqual(state)
  })

  it('handles LOAD_COLLECTION', () => {
    const action = { type: 'LOAD_COLLECTION' }
    const expected = loadingState
    expect(reducer(state, action)).toEqual(expected)
  })

  it('handles LOAD_COLLECTION_SUCCESS', () => {
    const action = {
      type: 'LOAD_COLLECTION_SUCCESS',
      payload: [{ id: 1 }, { id: 2 }],
    }
    const expected = {
      ...state,
      items: action.payload,
    }

    expect(reducer(loadingState, action)).toEqual(expected)
  })

  it('handles LOAD_COLLECTION_SUCCESS with non-array payload', () => {
    const action = {
      type: 'LOAD_COLLECTION_SUCCESS',
      payload: { id: 1 },
    }
    const expected = {
      ...state,
      items: [action.payload],
    }

    expect(reducer(loadingState, action)).toEqual(expected)
  })

  it('handles LOAD_COLLECTION_ERROR', () => {
    const action = {
      type: 'LOAD_COLLECTION_ERROR',
      payload: {
        message: 'error message',
      },
    }

    const expected = {
      ...state,
      error: action.payload.message,
    }

    expect(reducer(loadingState, action)).toEqual(expected)
  })

  it('handles LOAD_COLLECTION_ERROR with error message as payload', () => {
    const action = {
      type: 'LOAD_COLLECTION_ERROR',
      payload: 'error message',
    }

    const expected = {
      ...state,
      error: action.payload,
    }

    expect(reducer(loadingState, action)).toEqual(expected)
  })

  it('handles REHYDRATE (from redux-persist)', () => {
    const action = {
      type: REHYDRATE,
      payload: {
        collection: loadingState,
      },
    }
    const expected = state

    expect(reducer(loadingState, action)).toEqual(expected)
  })
})

// // ----------------------------
// // --- Collection Selectors ---
// // ----------------------------

describe('colletion selectors', () => {
  const state = {
    nested: {
      state: {
        works: {
          well: true,
        },
      },
      collection: {
        isLoading: false,
        error: 'Msg',
        items: [{ id: 'abc' }, { id: 'def' }],
      },
    },
    shallow: false,
    collection: {
      isLoading: true,
      error: null,
      items: [{ id: 1 }, { id: 2 }],
    },
  }

  describe('createCollectionSelector', () => {
    it('returns a state selector for provided key path', () => {
      const selector = createCollectionSelector(['nested', 'state', 'works'])
      expect(selector(state)).toEqual(state.nested.state.works)
    })

    it('works with shallow paths', () => {
      const selector = createCollectionSelector(['shallow'])
      expect(selector(state)).toEqual(state.shallow)
    })

    it('works with dot-seperated strings', () => {
      const selector = createCollectionSelector('nested.state.works.well')
      expect(selector(state)).toEqual(state.nested.state.works.well)
    })
  })

  describe('createIsLoadingSelector', () => {
    it('picks isLoading from the collection state', () => {
      const selector = createIsLoadingSelector('collection')
      expect(selector(state)).toEqual(state.collection.isLoading)
    })

    it('works with nested collections', () => {
      const selector = createIsLoadingSelector(['nested', 'collection'])
      expect(selector(state)).toEqual(state.nested.collection.isLoading)
    })
  })

  describe('createErrorSelector', () => {
    it('picks error from the collection state', () => {
      const selector = createErrorSelector('collection')
      expect(selector(state)).toEqual(state.collection.error)
    })

    it('works with nested collections', () => {
      const selector = createErrorSelector(['nested', 'collection'])
      expect(selector(state)).toEqual(state.nested.collection.error)
    })
  })

  describe('createItemSelector', () => {
    it('returns item with provided id from the collection', () => {
      const selector = createItemSelector('collection')
      expect(selector(state, 1)).toEqual([state.collection.items[0]])
    })

    it('works with nested collections', () => {
      const selector = createItemSelector(['nested', 'collection'])
      expect(selector(state, 'def')).toEqual([state.nested.collection.items[1]])
    })

    it('returns an empty array if no match was found', () => {
      const selector = createItemSelector('collection')
      expect(selector(state, 'noSuchId')).toEqual([])
    })
  })

  describe('createSingleResultSelector', () => {
    it('returns isLoading, error and first item for a collection', () => {
      const selector = createSingleResultSelector('collection')
      const expected = {
        isLoading: state.collection.isLoading,
        error: state.collection.error,
        result: state.collection.items[0],
      }

      expect(selector(state)).toEqual(expected)
    })

    it('works with nested collections', () => {
      const selector = createSingleResultSelector(['nested', 'collection'])
      const expected = {
        isLoading: state.nested.collection.isLoading,
        error: state.nested.collection.error,
        result: state.nested.collection.items[0],
      }

      expect(selector(state)).toEqual(expected)
    })
  })
})

// // --------------------------
// // --- Collection Actions ---
// // --------------------------

describe('createLoadAction', () => {
  const state = {
    collection: {
      isLoading: false,
      error: null,
      items: [],
    },
  }

  const dispatch = jest.fn()
  const getState = jest.fn(() => state)

  beforeEach(() => {
    fetch.mockClear()
    getState.mockClear()
    dispatch.mockClear()
  })

  const uri = 'path'
  const actionCreator = createLoadAction({ name: 'collection', uri })

  it('returns an action creator', () => {
    const response = { id: 1 }
    fetch.mockReturnValueOnce(Promise.resolve(response))
    const props = { body: '', query: {} }

    expect(typeof actionCreator).toBe('function')

    return actionCreator(props)(dispatch, getState).then(() => {
      expect(fetch).toHaveBeenCalledWith(uri, props)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_COLLECTION',
        payload: { ...props, uri },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_COLLECTION_SUCCESS',
        payload: response,
        meta: {
          props: { ...props, uri },
          response,
        },
      })

      expect(getState).toHaveBeenCalled()
    })
  })

  it('calls LOAD_COLLECTION_ERROR if we fail', () => {
    const error = 'Failed'
    fetch.mockReturnValueOnce(Promise.reject(error))
    const props = { body: '', query: {} }

    return actionCreator(props)(dispatch, getState).catch(() => {
      expect(fetch).toHaveBeenCalledWith(uri, props)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_COLLECTION',
        payload: { ...props, uri },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_COLLECTION_ERROR',
        payload: error,
        meta: {
          props: { ...props, uri },
          response: error,
        },
      })

      expect(getState).toHaveBeenCalled()
    })
  })

  it('uses provided responseTransform function', () => {
    const responseTransform = jest.fn(response => response.data)
    const actionCreatorWithTransform = createLoadAction({
      name: 'collection',
      uri,
      responseTransform,
    })

    const response = { data: ['item'] }
    fetch.mockReturnValueOnce(Promise.resolve(response))

    const props = { body: '', query: {} }

    return actionCreatorWithTransform(props)(dispatch, getState).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_COLLECTION_SUCCESS',
        payload: response.data,
        meta: {
          props: { ...props, uri },
          response: response.data,
        },
      })
      expect(responseTransform).toHaveBeenCalledWith(response)
    })
  })

  it('uses provided errorHandler action creator', () => {
    const errMsg = 'failed'
    const error = new Error(errMsg)
    error.response = errMsg

    const customError = payload => ({
      type: 'CUSTOM_ERROR',
      payload,
    })
    const errorHandler = jest.fn(customError)

    const actionCreatorWithErrorHandler = createLoadAction({
      name: 'collection',
      uri,
      errorHandler,
    })

    fetch.mockReturnValueOnce(Promise.reject(error))
    const props = { body: '', query: {} }

    return actionCreatorWithErrorHandler(props)(dispatch, getState).catch(
      () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'LOAD_COLLECTION_ERROR',
          error: true,
          payload: error,
          meta: {
            props: { ...props, uri },
            response: error,
          },
        })

        expect(errorHandler).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(customError(errMsg))
      }
    )
  })
})

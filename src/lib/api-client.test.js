import { encodeQueryString, createClient } from './api-client'

// Mock fetch so we can make sure it's called correctly
jest.mock('fetch-ponyfill', () => {
  const mockFetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(),
    })
  )
  return () => ({
    fetch: mockFetch,
  })
})

// Retrieve fetch mock so we can use it in assertions
import ponyFetch from 'fetch-ponyfill' // eslint-disable-line

const { fetch } = ponyFetch()

describe('encodeQueryString', () => {
  it('should return an URI-encoded version of supplied object', () => {
    const query = { test: 'data' }
    const expected = '?test=data'

    expect(encodeQueryString(query)).toEqual(expected)
  })

  it('should handle empty objects', () => {
    expect(encodeQueryString({})).toEqual('')
  })

  it('should return nothing if arg is not an object', () => {
    expect(encodeQueryString(null)).toEqual('')
  })

  it('should work with multiple keys', () => {
    const query = {
      first: 'data',
      second: 'works',
    }
    const expected = '?first=data&second=works'

    expect(encodeQueryString(query)).toEqual(expected)
  })
})

describe('createClient', () => {
  const baseUrl = 'BASE_URL'
  const c = createClient()

  beforeEach(() => {
    c.configure({
      baseUrl,
      token: null,
    })
    fetch.mockClear()
  })

  it('should return an object containing fetch, configure and createHref', () => {
    expect(typeof c).toBe('object')
    expect(typeof c.fetch).toBe('function')
    expect(typeof c.configure).toBe('function')
    expect(typeof c.createHref).toBe('function')
  })

  describe('createHref', () => {
    const { createHref } = c

    it('returns baseUrl if nothing was provided', () => {
      expect(createHref()).toEqual(baseUrl)
    })

    it('returns baseUrl with querystring', () => {
      const query = { test: 'data' }
      const queryString = '?test=data'

      expect(createHref(undefined, query)).toEqual(baseUrl + queryString)
    })

    it('returns baseUrl + uri', () => {
      const uri = 'test'
      expect(createHref(uri, {})).toEqual(baseUrl + uri)
    })

    it('returns baseUrl + uri + querystring', () => {
      const query = { test: 'data' }
      const queryString = '?test=data'
      const uri = 'test'
      expect(createHref(uri, query)).toEqual(baseUrl + uri + queryString)
    })
  })

  describe('configure', () => {
    it('sets provided config vars', () => {
      const newBaseUrl = 'NEW_BASE_URL'
      const config = { baseUrl: newBaseUrl }

      c.configure(config)
      expect(c.createHref()).toEqual(newBaseUrl)
    })
  })

  describe('fetch', () => {
    const defaultOptions = {
      headers: {
        Accept: 'application/json',
      },
      method: 'get',
    }

    const uri = 'my_uri'

    it('makes a get request if nothing is specified', () => {
      c.fetch(uri, {})
      expect(fetch).toHaveBeenCalledWith(baseUrl + uri, defaultOptions)
    })

    it('merges in provided headers', () => {
      const options = {
        headers: {
          TestHeader: true,
        },
      }
      const expectedOptions = {
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
        ...defaultOptions,
      }

      c.fetch(uri, {})
      expect(fetch).toHaveBeenCalledWith(baseUrl + uri, expectedOptions)
    })

    it('adds auth header if username and password is provided', () => {
      const options = {
        username: 'testing',
        password: 'pass',
      }

      const expected = {
        ...defaultOptions,
        ...options,
        headers: {
          Authorization:
            'Basic ' + btoa(options.username + ':' + options.password),
          ...defaultOptions.headers,
        },
      }

      c.fetch(uri, options)
      expect(fetch).toHaveBeenCalledWith(baseUrl + uri, expected)
    })

    it('adds querystring to url', () => {
      const options = {
        query: {
          test: 'data',
        },
      }
      const querystring = '?test=data'

      const expected = {
        ...options,
        ...defaultOptions,
      }

      c.fetch(uri, options)
      expect(fetch).toHaveBeenCalledWith(baseUrl + uri + querystring, expected)
    })

    it('uses provided method', () => {
      const options = {
        method: 'PUT',
      }

      const expected = {
        ...defaultOptions,
        ...options,
      }

      c.fetch(uri, options)
      expect(fetch).toHaveBeenCalledWith(baseUrl + uri, expected)
    })

    it('assumes post if we provide body', () => {
      const options = {
        body: 'data',
      }

      const expected = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          'Content-Type': 'application/json',
        },
        method: 'post',
      }

      c.fetch(uri, options)
      expect(fetch).toHaveBeenCalledWith(baseUrl + uri, expected)
    })

    it('adds auth header if token is in config', () => {
      const token = 'mySecretToken'
      const expected = {
        ...defaultOptions,
        headers: {
          ...defaultOptions.headers,
          Authorization: 'Token ' + token,
        },
      }

      c.configure({ token })
      c.fetch(uri, {})
      expect(fetch).toHaveBeenCalledWith(baseUrl + uri, expected)
    })
  })
})

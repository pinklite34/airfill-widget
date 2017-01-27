import ponyFetch from 'fetch-ponyfill';
const _fetch = ponyFetch();

if (!global.btoa) {
  global.btoa = (str) => {
    var buffer;

    if (str instanceof Buffer) {
      buffer = str;
    } else {
      buffer = new Buffer(str.toString(), 'binary');
    }

    return buffer.toString('base64');
  };
}

function encodeQueryString(obj) {
  return '?' + (
    Object.keys(obj)
      .filter(k => obj[k])
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
      .join('&')
  );
}

export const createClient = (conf={}) => {
  let baseUrl = conf.baseUrl || '/api';
  let {username, password, defaultHeaders, token} = conf;

  const doFetch = (uri, options) => {
    let url = baseUrl + uri;

    // Set default headers
    options.headers = {
      Accept: 'application/json',
      ...defaultHeaders,
      ...options.headers
    };

    // Build query string if needed
    if (options.query) {
      url = url + encodeQueryString(options.query);
    }

    // Add body data
    if (options.body) {
      options.headers = {
        'Content-Type': 'application/json',
        ...options.headers
      };

      if (typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
      }
    }

    options.method = options.method || (options.body ? 'post' : 'get');

    let user = options.username || username;
    let pass = options.password || password;

    // Add auth if provided
    if (user && pass) {
      options.headers = {
        Authorization: 'Basic ' + btoa(user + ':' + pass),
        ...options.headers
      };
    } else if (token) {
      options.headers = {
        Authorization: 'Token ' + token,
        ...options.headers
      };
    }

    return _fetch(url, options)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      })
      .catch(error => {
        return error.json()
          .then(json => {
            error.json = json;
            if (json.error) {
              return json.error.message;
            }
            if (json.message) {
              return json.message;
            }

            throw Error('No error information in JSON response');
          })
          .catch(() => {
            if (error.statusText) {
              return error.statusText;
            } else {
              return 'Server returned status code ' + error.status;
            }
          })
          .then(message => {
            const err = new Error(message);
            err.response = error;
            throw err;
          });
      });
  };

  const configure = (conf) => {
    baseUrl = 'baseUrl' in conf ? conf.baseUrl : baseUrl;
    username = 'username' in conf ? conf.username : username;
    password = 'password' in conf ? conf.password : password;
    token = 'token' in conf ? conf.token : token;
    defaultHeaders = 'defaultHeaders' in conf ? conf.defaultHeaders :
      defaultHeaders;
  };

  const createHref = (uri, queryParams) => {
    return baseUrl + uri + encodeQueryString(queryParams);
  };

  return { fetch: doFetch, configure, createHref };
};

export const client = createClient();

export function fetch (uri, options) {
  return client.fetch(uri, options);
}

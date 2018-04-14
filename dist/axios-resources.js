'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

function curry(fn) {
  function nest(N, args) {
    return (...xs) => {
      if (N - xs.length <= 0) {
        return fn(...args, ...xs);
      }
      return nest(N - xs.length, [...args, ...xs]);
    };
  }
  return nest(fn.length, []);
}

const getDefaultActions = () => ({
  get: { method: 'GET' },
  save: { method: 'POST' },
  query: { method: 'GET' },
  update: { method: 'PUT' },
  remove: { method: 'DELETE' },
  delete: { method: 'DELETE' }
});

const applyQueryStringsOnURL = (url, params) => {
  const tokens = url
    .match(/(:[a-zA-Z0-9])\w+/g);
  return tokens
    ? tokens
      .map(token => token.replace(':', ''))
      .reduce((acc, token) => acc.replace(`:${token}`, params[token] || ''), url)
    : url
};

const getHttpClientLibraryMethod = (HttpClientLibrary, method = 'get') => HttpClientLibrary[method.toLowerCase()];

const prepareBaseURL = (baseURL, url = '', params = {}) => {
  const replacedUrlWithTokens = applyQueryStringsOnURL(url, params);
  return `${baseURL}${replacedUrlWithTokens}`
};

const createResources = (HttpClientLibrary, name, action, baseURL) => {
  const httpClientLibraryMethod = getHttpClientLibraryMethod(HttpClientLibrary, action.method);
  return {
    [name](params = {}, extra = {}) {
      return httpClientLibraryMethod(
        prepareBaseURL(baseURL, action.url, params),
        params,
        Object.assign({ headers: { 'Content-Type': 'application/json' } }, extra)
      )
    }
  }
};
const resources = curry((baseURL, customActions = {}) => {
  const actions = Object.assign(
    getDefaultActions(),
    customActions
  );

  return Object.keys(actions)
    .reduce((acc, key) => Object.assign(
      acc,
      createResources(axios, key, actions[key], baseURL)
    ), {})
});

const resources$1 = resources;

var axiosResources = {
  resources: resources$1
}

exports.resources = resources$1;
exports.default = axiosResources;

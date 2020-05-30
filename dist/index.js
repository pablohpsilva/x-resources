function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import axios from 'axios';
import curry from "./curry";

const getDefaultActions = () => ({
  get: {
    method: 'GET'
  },
  save: {
    method: 'POST'
  },
  query: {
    method: 'GET'
  },
  update: {
    method: 'PUT'
  },
  remove: {
    method: 'DELETE'
  },
  delete: {
    method: 'DELETE'
  }
});

export const applyQueryStringsOnURL = (url, params) => {
  const tokens = url.match(/(:[a-zA-Z0-9])\w+/g);
  return tokens ? tokens.map(token => token.replace(':', '')).reduce((acc, token) => acc.replace(`:${token}`, `${params[token]}` || ''), url) : url;
};
export const getHttpClientLibraryMethod = function getHttpClientLibraryMethod(HttpClientLibrary) {
  let method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
  return HttpClientLibrary[method.toLowerCase()];
};
export const prepareBaseURL = function prepareBaseURL(baseURL) {
  let url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const replacedUrlWithTokens = applyQueryStringsOnURL(url, params);
  return `${baseURL}${replacedUrlWithTokens}`;
};
export const createResources = (HttpClientLibrary, name, action, baseURL) => {
  const httpClientLibraryMethod = getHttpClientLibraryMethod(HttpClientLibrary, action.method);
  return {
    [name]() {
      let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return httpClientLibraryMethod(prepareBaseURL(baseURL, action.url, params), _objectSpread(_objectSpread({}, params), {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      }, extra));
    }

  };
};
export const resources = curry(function (baseURL) {
  let customActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  const actions = _objectSpread(_objectSpread({}, getDefaultActions()), customActions);

  const axiosInstance = options.axiosInstance || axios;
  return Object.keys(actions).reduce((acc, key) => _extends(acc, createResources(axiosInstance, key, actions[key], baseURL)), {});
});
export default resources;
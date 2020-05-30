Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resources = exports.createResources = exports.prepareBaseURL = exports.getHttpClientLibraryMethod = exports.applyQueryStringsOnURL = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _curry = require("./curry");

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getDefaultActions = function getDefaultActions() {
  return {
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
    "delete": {
      method: 'DELETE'
    }
  };
};

var applyQueryStringsOnURL = exports.applyQueryStringsOnURL = function applyQueryStringsOnURL(url, params) {
  var tokens = url.match(/(:[a-zA-Z0-9])\w+/g);
  return tokens ? tokens.map(function (token) {
    return token.replace(':', '');
  }).reduce(function (acc, token) {
    return acc.replace(":".concat(token), "".concat(params[token]) || '');
  }, url) : url;
};

var getHttpClientLibraryMethod = exports.getHttpClientLibraryMethod = function getHttpClientLibraryMethod(HttpClientLibrary) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
  return HttpClientLibrary[method.toLowerCase()];
};

var prepareBaseURL = exports.prepareBaseURL = function prepareBaseURL(baseURL) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var replacedUrlWithTokens = applyQueryStringsOnURL(url, params);
  return "".concat(baseURL).concat(replacedUrlWithTokens);
};

var createResources = exports.createResources = function createResources(HttpClientLibrary, name, action, baseURL) {
  var httpClientLibraryMethod = getHttpClientLibraryMethod(HttpClientLibrary, action.method);
  return _defineProperty({}, name, function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return httpClientLibraryMethod(prepareBaseURL(baseURL, action.url, params), _objectSpread(_objectSpread({}, params), {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }, extra));
  });
};

var resources = exports.resources = (0, _curry2["default"])(function (baseURL) {
  var customActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var actions = _objectSpread(_objectSpread({}, getDefaultActions()), customActions);

  var axiosInstance = options.axiosInstance || _axios2["default"];
  return Object.keys(actions).reduce(function (acc, key) {
    return _extends(acc, createResources(axiosInstance, key, actions[key], baseURL));
  }, {});
});
exports["default"] = resources;
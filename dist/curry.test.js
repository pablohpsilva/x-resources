require("core-js/stable");

require("regenerator-runtime/runtime");

var _curry = require("./curry");

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var curryFn = (0, _curry2["default"])(function (a, b, c) {
  return a + b + c;
});
test('testing curry returning functions', function () {
  expect(_typeof(curryFn(1))).toBe('function');
  expect(_typeof(curryFn(1)(2))).toBe('function');
  expect(curryFn(1)(2)(3)).toBe(6);
});
test('testing curry returning straight value', function () {
  expect(curryFn(1, 2, 3)).toBe(6);
});
require("core-js/stable");

require("regenerator-runtime/runtime");

var _ = require("./");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var simpleActions = {
  fetchUsers: {
    method: "GET",
    url: "/users"
  },
  fetchSpecificUser: {
    method: "GET",
    url: "/users/:username"
  },
  fetchSpecificUserQueryParam: {
    method: "DELETE",
    url: "/users/:username?id=:id"
  }
};
var baseURL = "https://api.github.com";
var simpleResource = (0, _.resources)(baseURL, simpleActions);
var username = "pablohpsilva";
var id = 2090635;
test("create resource using axios", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var resourceCreated;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          expect(Object.keys(simpleResource).length).toBe(9);
          resourceCreated = Object.values(simpleResource);
          expect(resourceCreated.every(function (el) {
            return el instanceof Function;
          })).toBe(true);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test("fetchUsers from resource", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var response, data, user;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return simpleResource.fetchUsers()["catch"](function (error) {
            throw error;
          });

        case 2:
          response = _context2.sent;
          data = response.data;
          expect(data instanceof Array).toBe(true);
          expect(!!data.length).toBe(true);

          if (data.length && data[0]) {
            user = data[0];
            expect(Object.prototype.hasOwnProperty.call(user, "login")).toBe(true);
          }

          expect(response.config.url).toBe("".concat(baseURL, "/users"));

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test("fetchSpecificUser from resource", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var response, data;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return simpleResource.fetchSpecificUser({
            username: username,
            id: id
          })["catch"](function (error) {
            throw error;
          });

        case 2:
          response = _context3.sent;
          data = response.data;
          expect(data instanceof Object).toBe(true);
          expect(data.login).toBe(username);
          expect(response.config.url).toBe("".concat(baseURL, "/users/").concat(username));

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test("applyQueryStringsOnURL should replace correctly the URL", function () {
  var url = "".concat(baseURL, "/:username");
  var params = {
    username: 1
  };
  expect((0, _.applyQueryStringsOnURL)(url, params)).toBe("".concat(baseURL, "/1"));
});
test("getHttpClientLibraryMethod should return the correct funcion", function () {
  var axios = {
    get: function get() {
      return 1;
    }
  };
  var method = "get";
  expect((0, _.getHttpClientLibraryMethod)(axios, method)()).toBe(1);
});
test("prepareBaseURL should return the correct funcion", function () {
  var url = "/user/:username";
  var params = {
    username: 1
  };
  expect((0, _.prepareBaseURL)(baseURL, url, params)).toBe("".concat(baseURL, "/user/1"));
});
test("createResources should return the resource", function () {
  var axios = {
    get: function get() {
      return 1;
    }
  };
  var method = "get";
  var name = "fetch";
  var action = {
    method: "GET",
    url: "/user/:username"
  }; // HttpClientLibrary, name, action, baseURL

  expect((0, _.createResources)(axios, name, action, baseURL).fetch()).toBe(1);
});
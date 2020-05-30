const curry = fn => {
  const nest = (N, args) => {
    return function () {
      for (var _len = arguments.length, xs = new Array(_len), _key = 0; _key < _len; _key++) {
        xs[_key] = arguments[_key];
      }

      if (N - xs.length <= 0) {
        return fn(...args, ...xs);
      }

      return nest(N - xs.length, [...args, ...xs]);
    };
  };

  return nest(fn.length, []);
};

export default curry;
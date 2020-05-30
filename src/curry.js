const curry = fn => {
    const nest = (N, args) => {
        return (...xs) => {
            if (N - xs.length <= 0) {
                return fn(...args, ...xs)
            }
            return nest(N - xs.length, [...args, ...xs])
        }
    }
    return nest(fn.length, [])
}

export default curry

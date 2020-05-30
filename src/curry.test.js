import 'core-js/stable'
import 'regenerator-runtime/runtime'
import curry from './curry'

const curryFn = curry((a, b, c) => a + b + c)

test('testing curry returning functions', () => {
    expect(typeof curryFn(1)).toBe('function')
    expect(typeof curryFn(1)(2)).toBe('function')
    expect(curryFn(1)(2)(3)).toBe(6)
})

test('testing curry returning straight value', () => {
    expect(curryFn(1, 2, 3)).toBe(6)
})

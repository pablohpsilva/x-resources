import "core-js/stable";
import "regenerator-runtime/runtime";
import { resources } from './dist/axios-resources'

const simpleActions = {
  fetchUsers: { method: 'GET', url: '/users' },
  fetchSpecificUser: { method: 'GET', url: '/users/:username' },
  fetchSpecificUserQueryParam: { method: 'DELETE', url: '/users/:username?id=:id' },
}

const baseURL = 'https://api.github.com'

const simpleResource = resources(baseURL, simpleActions)

const username = 'pablohpsilva'

const id = 2090635

test('create resource using axios', async () => {
  expect(Object.keys(simpleResource).length).toBe(9)
  const resourceCreated = Object.values(simpleResource)

  expect(resourceCreated.every(el => el instanceof Function)).toBe(true)
})

test('fetchUsers from resource', async () => {
  const response = await simpleResource.fetchUsers()
    .catch(error => { throw error })

  const { data } = response

  expect(data instanceof Array).toBe(true)
  expect(!!data.length).toBe(true)

  if (data.length && data[0]) {
    const user = data[0]
    expect(Object.prototype.hasOwnProperty.call(user, 'login')).toBe(true)
  }

  expect(response.request.responseURL).toBe(`${baseURL}/users`)
})

test('fetchSpecificUser from resource', async () => {
  const response = await simpleResource.fetchSpecificUser({ username, id })
    .catch(error => { throw error })

  const { data } = response

  expect(data instanceof Object).toBe(true)
  expect(data.login).toBe(username)

  expect(response.request.responseURL).toBe(`${baseURL}/users/${username}`)
})

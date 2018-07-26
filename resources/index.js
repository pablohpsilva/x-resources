import axios from 'axios'
import curry from './curry'

const getDefaultActions = () => ({
  get: { method: 'GET' },
  save: { method: 'POST' },
  query: { method: 'GET' },
  update: { method: 'PUT' },
  remove: { method: 'DELETE' },
  delete: { method: 'DELETE' }
})

export const applyQueryStringsOnURL = (url, params) => {
  const tokens = url
    .match(/(:[a-zA-Z0-9])\w+/g)
  return tokens
    ? tokens
      .map(token => token.replace(':', ''))
      .reduce((acc, token) => acc.replace(`:${token}`, params[token] || ''), url)
    : url
}

export const getHttpClientLibraryMethod = (HttpClientLibrary, method = 'get') => HttpClientLibrary[method.toLowerCase()]

export const prepareBaseURL = (baseURL, url = '', params = {}) => {
  const replacedUrlWithTokens = applyQueryStringsOnURL(url, params)
  return `${baseURL}${replacedUrlWithTokens}`
}

export const createResources = (HttpClientLibrary, name, action, baseURL) => {
  const httpClientLibraryMethod = getHttpClientLibraryMethod(HttpClientLibrary, action.method)
  return {
    [name](params = {}, extra = {}) {
      return httpClientLibraryMethod(
        prepareBaseURL(baseURL, action.url, params),
        params,
        Object.assign({ headers: { 'Content-Type': 'application/json' } }, extra)
      )
    }
  }
}

export const resources = curry((baseURL, customActions = {}, options = {}) => {
  const actions = Object.assign(
    getDefaultActions(),
    customActions
  )

  const axiosInstance = options.axiosInstance || axios

  return Object.keys(actions)
    .reduce((acc, key) => Object.assign(
      acc,
      createResources(axiosInstance, key, actions[key], baseURL)
    ), {})
})

export default resources

import axios from 'axios'
import qs from 'qs'

const DEFAULT_OPTIONS = { withCredentials: true }

axios.defaults.baseURL =
  'https://7kuwlltzmc.execute-api.eu-central-1.amazonaws.com/latest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const getAuthToken = () => localStorage.getItem('TOKEN')

function executeRequest(
  method,
  url,
  data,
  options = DEFAULT_OPTIONS,
  headers = {}
) {
  const params = {
    method,
    url,
    data,
    options: {
      ...options,
      ...DEFAULT_OPTIONS,
    },
    headers: {
      Authorization: getAuthToken(),
    },
  }

  return new Promise((resolve, reject) => {
    axios(params)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * Get method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
 export function get(url, data, options) {
  const query = qs.stringify(data, { encode: true, arrayFormat: 'brackets' })
  return executeRequest('get', `${url}?${query || ''}`, null, options)
}

/**
 * Post method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function post(url, data, options) {
  // if need upload file use this post
  return executeRequest('post', `${url}`, data, options)
}

/**
 * Patch method
 * @param {String}url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function patch(url, data, options) {
  return executeRequest('patch', `${url}`, data, options)
}

/**
 * Put method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function put(url, data, options) {
  return executeRequest('put', `${url}`, data, options)
}

/**
 * Delete method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function del(url, data, options) {
  return executeRequest('delete', `${url}`, data, options)
}


import axios from 'axios'

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

export function post(url, data, options) {
  // if need upload file use this post
  return executeRequest('post', `${url}`, data, options)
}

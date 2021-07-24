import request from 'graphql-request'
import { GRAPH_API_URL } from '../constants'
import { PAYABLE_TOKEN_REQUEST } from './gql.service'
import { post } from './request.service'

export const getPayableTokenReport = async (id) => {
  console.log(GRAPH_API_URL)
  return request(GRAPH_API_URL, PAYABLE_TOKEN_REQUEST, { id })
}

export const fetchAuthToken = async (account) => {
  try {
    const data = await post('/account-exists', {
      wallet: account,
    })
    if (data === 0) {
      return ''
    }
    return data
  } catch (err) {
    return ''
  }
}

export const signup = async (account, username, email) => {
  try {
    const message = await post('/register', {
      wallet: account,
      username,
      email,
      ipAddrs: '',
    })
    return message
  } catch (err) {
    return null
  }
}

export const authenticate = async (account, signMsg, signature) => {
  try {
    const data = await post('/authenticate', {
      wallet: account,
      randomString: signMsg,
      signature,
    })
    return data
  } catch (e) {
    return null
  }
}

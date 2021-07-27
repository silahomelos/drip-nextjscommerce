import request from 'graphql-request'
import { GRAPH_API_URL } from '../constants'
import { post } from './request.service'
import {
  DRIP_MARKETPLACE_PURCHASE_HISTORES,
  PAYABLE_TOKEN_REQUEST,
} from './gql.service'

export const getPayableTokenReport = async (id) => {
  return request(GRAPH_API_URL, PAYABLE_TOKEN_REQUEST, { id })
}

export const getMarketplacePurchaseHistories = async (orderId) => {
  return request(GRAPH_API_URL, DRIP_MARKETPLACE_PURCHASE_HISTORES, { orderId })
}

export const fetchAuthToken = async (account) => {
  try {
    if (!account) return null
    const data = await post('/account-exists', {
      wallet: account,
    })
    if (data === 0) {
      return null
    }
    return data
  } catch (err) {
    return null
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

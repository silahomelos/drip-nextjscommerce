import request from 'graphql-request'
import axios from 'axios'
import { GRAPH_API_URL } from '../constants'
import { post } from './request.service'
import {
  DIGITALAX_GARMENT_V2_COLLECTION_BY_ID,
  DRIP_MARKETPLACE_PURCHASE_HISTORES,
  PAYABLE_TOKEN_REQUEST,
  DRIP_MARKETPLACE_OFFERS,
  DRIP_MARKETPLACE_OFFER_BY_ID
} from './gql.service'

export const getPayableTokenReport = async (id) => {
  return request(GRAPH_API_URL, PAYABLE_TOKEN_REQUEST, { id })
}

export const getMarketplacePurchaseHistories = async (orderId) => {
  return request(GRAPH_API_URL, DRIP_MARKETPLACE_PURCHASE_HISTORES, { orderId })
}

export const getDigitalaxGarmentV2CollectionById = async (id) => {
  return request(GRAPH_API_URL, DIGITALAX_GARMENT_V2_COLLECTION_BY_ID, { id })
}

export const getDripMarketplaceOffers = async () => {
  return request(GRAPH_API_URL, DRIP_MARKETPLACE_OFFERS)
}

export const getDripMarketplaceOfferById = async (id) => {
  return request(GRAPH_API_URL, DRIP_MARKETPLACE_OFFER_BY_ID, { id })
}

export const fetchAuthToken = async (account) => {
  try {
    console.log('this is inside fetch auth token', account)
    if (!account) return null
    const data = await post('/account-exists', {
      wallet: account,
    })
    console.log('this is after post account-exists')
    if (data === 0) {
      return null
    }
    return data
  } catch (err) {
    throw err
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
    throw err
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
    throw err
  }
}


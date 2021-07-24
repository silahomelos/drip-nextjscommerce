import request from 'graphql-request'
import { GRAPH_API_URL } from '../constants'
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

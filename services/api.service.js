import request from 'graphql-request'
import { GRAPH_API_URL } from '../constants'
import { PAYABLE_TOKEN_REQUEST } from './gql.service'

export const getPayableTokenReport = async (network, id) => {
  return request(GRAPH_API_URL[network], PAYABLE_TOKEN_REQUEST, { id })
}

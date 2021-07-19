import request from 'graphql-request'
import { GRAPH_API_URL } from '../constants'
import { PAYABLE_TOKEN_REQUEST } from './gql.service'

export const getPayableTokenReport = async (id) => {
  console.log(GRAPH_API_URL)
  return request(GRAPH_API_URL, PAYABLE_TOKEN_REQUEST, { id })
}
